import ProductCategoryRepository from "@ports/IProductCategoryRepository";
import AbstractUseCase from "@useCases/AbstractUseCase";

export default class ProductCategoryDeleteUseCase extends AbstractUseCase {

	constructor(readonly productCategoryRepository: ProductCategoryRepository) {
		super(productCategoryRepository);
	}

	public async execute(id: number | null): Promise<void | null> {
		if (!id || isNaN(Number(id))) {
			this.setError({ message: 'The id must be numeric' });
			return null;
		}

		if (await this.productCategoryRepository.countProductReferences(id)) {
			this.setError({ message: 'The category is in use and cannot be deleted' });
			return null;
		}

		return await this.productCategoryRepository.delete(id);
	}
}