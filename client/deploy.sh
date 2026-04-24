#!/usr/bin/env bash
# =============================================================================
#  deploy.sh — Manual React → AWS S3 Deployment Script
#  Usage:
#    ./deploy.sh              → deploy using .env.deploy config
#    ./deploy.sh --provision  → create + configure S3 bucket (first time only)
#    ./deploy.sh --dry-run    → preview what would be synced (no upload)
# =============================================================================

set -euo pipefail

# ── Colors ────────────────────────────────────────────────────────────────────
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
BOLD='\033[1m'
RESET='\033[0m'

# ── Flags ─────────────────────────────────────────────────────────────────────
DRY_RUN=false
PROVISION=false
for arg in "$@"; do
  case "$arg" in
    --dry-run)   DRY_RUN=true ;;
    --provision) PROVISION=true ;;
  esac
done

$DRY_RUN    && echo -e "${YELLOW}⚠  DRY RUN mode — no files will be uploaded${RESET}"
$PROVISION  && echo -e "${CYAN}🔧 PROVISION mode — will create & configure S3 bucket${RESET}"

# ── Load .env (safe parser) ───────────────────────────────────────────────────
ENV_FILE=".env.deploy"
if [[ ! -f "$ENV_FILE" ]]; then
  echo -e "${RED}❌ Missing ${ENV_FILE}. Copy .env.deploy.example and fill in values.${RESET}"
  exit 1
fi

echo -e "${CYAN}📄 Loading config from ${ENV_FILE}${RESET}"
while IFS= read -r raw || [[ -n "$raw" ]]; do
  line="${raw%$'\r'}"                          # strip Windows CRLF
  [[ -z "$line" || "$line" =~ ^[[:space:]]*# ]] && continue  # skip blanks/comments
  [[ "$line" != *"="* ]] && continue          # skip non KEY=VALUE lines
  key="${line%%=*}"
  value="${line#*=}"
  # trim whitespace from key
  key="$(echo "$key" | tr -d '[:space:]')"
  # strip inline comment then trim ALL whitespace from value using tr
  value="$(echo "$value" | sed 's/#.*$//' | tr -d '\r' | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')"
  # only export valid shell identifiers
  if [[ "$key" =~ ^[a-zA-Z_][a-zA-Z0-9_]*$ && -n "$key" ]]; then
    export "$key=$value"
  fi
done < "$ENV_FILE"

# ── Required variable checks ──────────────────────────────────────────────────
REQUIRED_VARS=(AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY AWS_REGION S3_BUCKET_NAME)
for var in "${REQUIRED_VARS[@]}"; do
  if [[ -z "${!var:-}" ]]; then
    echo -e "${RED}❌ Required variable \$${var} is not set in ${ENV_FILE}${RESET}"
    exit 1
  fi
done

BUILD_DIR="${BUILD_DIR:-dist}"

# ── Step 1: Verify AWS CLI ────────────────────────────────────────────────────
echo -e "\n${BOLD}[1] Verifying AWS CLI...${RESET}"
if ! command -v aws &>/dev/null; then
  echo -e "${RED}❌ AWS CLI not found. Install: https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html${RESET}"
  exit 1
fi
echo -e "${GREEN}✔ AWS CLI: $(aws --version)${RESET}"

# ── PROVISION (--provision flag only) ─────────────────────────────────────────
if $PROVISION; then
  echo -e "\n${BOLD}[P1] Checking if bucket exists...${RESET}"
  if aws s3api head-bucket --bucket "${S3_BUCKET_NAME}" --region "${AWS_REGION}" 2>/dev/null; then
    echo -e "${YELLOW}⚠  Bucket '${S3_BUCKET_NAME}' already exists — re-applying config.${RESET}"
  else
    echo -e "\n${BOLD}[P2] Creating S3 bucket: ${S3_BUCKET_NAME}${RESET}"
    if [[ "$AWS_REGION" == "us-east-1" ]]; then
      aws s3api create-bucket \
        --bucket "${S3_BUCKET_NAME}" \
        --region "${AWS_REGION}"
    else
      aws s3api create-bucket \
        --bucket "${S3_BUCKET_NAME}" \
        --region "${AWS_REGION}" \
        --create-bucket-configuration LocationConstraint="${AWS_REGION}"
    fi
    echo -e "${GREEN}✔ Bucket created${RESET}"
  fi

  echo -e "\n${BOLD}[P3] Disabling Block Public Access...${RESET}"
  aws s3api put-public-access-block \
    --bucket "${S3_BUCKET_NAME}" \
    --public-access-block-configuration \
      "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false"
  echo -e "${GREEN}✔ Public access unblocked${RESET}"

  echo -e "\n${BOLD}[P4] Enabling static website hosting...${RESET}"
  aws s3 website "s3://${S3_BUCKET_NAME}" \
    --index-document index.html \
    --error-document index.html
  echo -e "${GREEN}✔ Static hosting enabled${RESET}"

  echo -e "\n${BOLD}[P5] Applying public-read bucket policy...${RESET}"
  aws s3api put-bucket-policy \
    --bucket "${S3_BUCKET_NAME}" \
    --policy "{
      \"Version\": \"2012-10-17\",
      \"Statement\": [{
        \"Sid\": \"PublicReadGetObject\",
        \"Effect\": \"Allow\",
        \"Principal\": \"*\",
        \"Action\": \"s3:GetObject\",
        \"Resource\": \"arn:aws:s3:::${S3_BUCKET_NAME}/*\"
      }]
    }"
  echo -e "${GREEN}✔ Bucket policy applied${RESET}"

  echo ""
  echo -e "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo -e "${GREEN}${BOLD}✅ Bucket provisioned!${RESET}"
  echo -e "🪣 Bucket : s3://${S3_BUCKET_NAME}"
  echo -e "🌍 Region : ${AWS_REGION}"
  echo -e "🌐 URL    : ${CYAN}http://${S3_BUCKET_NAME}.s3-website-${AWS_REGION}.amazonaws.com${RESET}"
  echo -e "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo -e "👉 Now run ${BOLD}./deploy.sh${RESET} to deploy your app."
  exit 0
fi

# ── Step 2: Build ─────────────────────────────────────────────────────────────
echo -e "\n${BOLD}[2] Building React application...${RESET}"
npm ci
npm run build
echo -e "${GREEN}✔ Build complete → ./${BUILD_DIR}/${RESET}"

# ── Step 3: Validate bucket ───────────────────────────────────────────────────
echo -e "\n${BOLD}[3] Validating S3 bucket: ${S3_BUCKET_NAME}${RESET}"
if ! aws s3api head-bucket --bucket "${S3_BUCKET_NAME}" --region "${AWS_REGION}" 2>/dev/null; then
  echo -e "${RED}❌ Bucket '${S3_BUCKET_NAME}' not found.${RESET}"
  echo -e "${YELLOW}💡 Run: ${BOLD}./deploy.sh --provision${RESET}${YELLOW} to create and configure it first.${RESET}"
  exit 1
fi
echo -e "${GREEN}✔ Bucket reachable${RESET}"

# ── Step 4: Sync to S3 ───────────────────────────────────────────────────────
echo -e "\n${BOLD}[4] Deploying to S3...${RESET}"

SYNC_FLAGS="--delete --region ${AWS_REGION}"
$DRY_RUN && SYNC_FLAGS="$SYNC_FLAGS --dryrun"

# Static assets — 1 year cache (content-hashed filenames handle busting)
aws s3 sync "${BUILD_DIR}/" "s3://${S3_BUCKET_NAME}/" \
  $SYNC_FLAGS \
  --cache-control "public, max-age=31536000, immutable" \
  --exclude "index.html"

# index.html — no-cache so users always get the latest entry point
if ! $DRY_RUN; then
  aws s3 cp "${BUILD_DIR}/index.html" "s3://${S3_BUCKET_NAME}/index.html" \
    --region "${AWS_REGION}" \
    --cache-control "no-cache, no-store, must-revalidate" \
    --content-type "text/html"
fi

# ── Done ──────────────────────────────────────────────────────────────────────
echo ""
echo -e "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if $DRY_RUN; then
  echo -e "${YELLOW}✅ Dry run complete — no files uploaded.${RESET}"
else
  echo -e "${GREEN}${BOLD}✅ Deployment successful!${RESET}"
  echo -e "🌐 URL    : ${CYAN}http://${S3_BUCKET_NAME}.s3-website-${AWS_REGION}.amazonaws.com${RESET}"
  echo -e "🪣 Bucket : s3://${S3_BUCKET_NAME}"
  echo -e "📦 Source : ./${BUILD_DIR}/"
fi
echo -e "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"