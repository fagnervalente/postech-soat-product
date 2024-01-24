import { ProductCategoryModel as ProductCategory } from "../../../src/adapter/database/models/ProductCategoryModel";
import ProductRepository from '../../../src/ports/IProductRepository';
import { ProductModel as Product } from "../../../src/adapter/database/models/ProductModel";
export default class ProductInMemoryRepository implements ProductRepository {

	public products: Product[] = [];

	public async save(product: Product): Promise<Product> {
		const created = {
			...product,
			id: product.id ? product.id : Math.floor(Math.random() * Date.now())
		};
		this.products.push(created);

		return created;
	}

	public async findById(id: number): Promise<Product | null> {
		const finded = this.products.find((product) => product.id == id) ?? null;
		return finded;
	}

	public async delete(id: number): Promise<void> {
		this.products = this.products.filter((product) => {
			return product.id != id;
		});
	}

	public async listByCategory(category: ProductCategory): Promise<Product[]> {
		return this.products.filter((product) => {
			return product.category == category;
		});
	}

	public async update(product: Product): Promise<void> {
		this.products.forEach((p) => {
			if (p.id == product.id) {
				p.name = product.name;
				p.category = product.category;
				p.description = product.description;
				p.price = product.price;
			}
		});
	}

}