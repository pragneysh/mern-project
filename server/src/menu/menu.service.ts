import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { Item } from './item.entity';
import { S3Service } from '../aws/s3.service';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,

    @InjectRepository(Item)
    private readonly itemRepo: Repository<Item>,

    private readonly s3Service: S3Service,
  ) {}

  // ✅ CREATE
  async createCategory(body: { name: string; description: string }, file?: Express.Multer.File) {
    if (!body.name || !body.description) {
      throw new BadRequestException('Name and description are required');
    }

    let imageURL: string | null = null;

    if (file) {
      const uploaded = await this.s3Service.uploadFile(file, 'menu');
      imageURL = uploaded.url;
    }

    const category = this.categoryRepo.create({
      name: body.name.trim(),
      description: body.description.trim(),
      image: imageURL,
    });

    return await this.categoryRepo.save(category);
  }

  // ✅ GET ALL
  async getAllCategories() {
    return await this.categoryRepo.find({
      order: { createdAt: 'DESC' },
    });
  }

  // ✅ UPDATE
  async updateCategory(id: string, body: { name: string; description: string }, file?: Express.Multer.File) {
    if (!body.name || !body.description) {
      throw new BadRequestException('Name and description are required');
    }

    const category = await this.categoryRepo.findOne({ where: { id } });

    if (!category) {
      throw new BadRequestException('Category not found');
    }

    let imageURL = category.image;

    // If new file uploaded
    if (file) {
      // delete old image if exists
      if (category.image) {
        const oldKey = category.image.split('.amazonaws.com/')[1];
        await this.s3Service.deleteFile(oldKey);
      }

      const uploaded = await this.s3Service.uploadFile(file, 'menu');
      imageURL = uploaded.url;
    }

    category.name = body.name.trim();
    category.description = body.description.trim();
    category.image = imageURL;

    return await this.categoryRepo.save(category);
  }

  // ✅ DELETE
  async deleteCategory(id: string) {
    const category = await this.categoryRepo.findOne({ where: { id } });

    if (!category) {
      throw new BadRequestException('Category not found');
    }

    // Delete image from S3
    if (category.image) {
      const key = category.image.split('.amazonaws.com/')[1];
      await this.s3Service.deleteFile(key);
    }

    await this.categoryRepo.remove(category);

    return { message: 'Category and image deleted successfully' };
  }

  // ✅ Menu Item CRUD

  // ✅ CREATE
  async createMenuItem(
    body: {
      name: string;
      description: string;
      price: number;
      categoryId: string;
      rating: number | null;
    },
    file?: Express.Multer.File | null,
  ) {
    const { name, description, price, categoryId } = body;

    if (!name || !description || !categoryId || price === undefined || price === null) {
      throw new BadRequestException('Name, description, price and category are required');
    }

    if (price < 0) {
      throw new BadRequestException('Price must be greater than or equal to 0');
    }

    let imageURL: string | null = null;

    try {
      if (file) {
        const uploaded = await this.s3Service.uploadFile(file, 'menuItems');
        imageURL = uploaded.url;
      }
    } catch (error) {
      console.error('🔥 S3 Upload Failed:', error);
      throw error;
    }

    const menuItem = this.itemRepo.create({
      name,
      description,
      price,
      image: imageURL,
      rating: body.rating,
      category: { id: categoryId },
    });

    return await this.itemRepo.save(menuItem);
  }

  // ✅ GET All Menu Items
  async getAllMenuItems() {
    return await this.itemRepo.find({
      order: { createdAt: 'DESC' },
      relations: ['category'],
    });
  }

  // ✅ Get Category Menu Items
  async getCategoryMenuItems(categoryId: string) {
    // First check if category exists
    const category = await this.categoryRepo.findOne({
      where: { id: categoryId },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const items = await this.itemRepo.find({
      where: { category: { id: categoryId } },
      relations: ['category'],
      order: { createdAt: 'DESC' },
    });

    return {
      items,
      category: category,
    };
  }

  // ✅ GET One Menu Item
  async getMenuItem(itemId: string) {
    const item = await this.itemRepo.findOne({
      where: { id: itemId },
      relations: ['category'], // 🔥 load relation
    });

    return item;
  }

  // ✅ UPDATE Menu Item
  async updateMenuItem(
    itemId: string,
    body: {
      name: string;
      description: string;
      price: number;
      categoryId: string;
      rating: number | null;
    },
    file?: Express.Multer.File,
  ) {
    const { name, description, price, categoryId, rating } = body;

    if (!name || !description || !categoryId || price === undefined || price === null) {
      throw new BadRequestException('Name, description, price and category are required');
    }

    if (price < 0) {
      throw new BadRequestException('Price must be greater than or equal to 0');
    }

    const item = await this.itemRepo.findOne({
      where: { id: itemId },
      relations: ['category'],
    });

    if (!item) {
      throw new BadRequestException('Menu item not found');
    }

    let imageURL = item.image;

    // ✅ If new file uploaded
    if (file) {
      // 🔥 Delete old image from S3
      if (item.image) {
        const oldKey = item.image.split('.amazonaws.com/')[1];
        await this.s3Service.deleteFile(oldKey);
      }

      // 🔥 Upload new image
      const uploaded = await this.s3Service.uploadFile(file, 'menuItems');
      imageURL = uploaded.url;
    }

    // ✅ Update fields
    item.name = name.trim();
    item.description = description.trim();
    item.price = price;
    item.rating = rating;
    item.image = imageURL;

    // 🔥 Update relation properly
    item.category = { id: categoryId } as any; // eslint-disable-line

    const updatedItem = await this.itemRepo.save(item);
    return updatedItem;
  }

  // ✅ DELETE Menu Item
  async deleteMenuItem(itemId: string) {
    const item = await this.itemRepo.findOne({ where: { id: itemId } });

    if (!item) {
      throw new BadRequestException('Menu item not found');
    }

    if (item.image) {
      const oldKey = item.image.split('.amazonaws.com/')[1];
      await this.s3Service.deleteFile(oldKey);
    }

    await this.itemRepo.delete({ id: itemId });

    return { message: 'Menu item deleted successfully' };
  }
}
