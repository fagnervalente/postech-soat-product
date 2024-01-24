import { Given, Then } from '@cucumber/cucumber';
import ProductCategoryInMemoryRepository from '../../utils/repositoryInMemory/ProductCategoryInMemoryRepository';
import { ProductCategory } from '../../../src/domain/entities/ProductCategory';
import ProductInMemoryRepository from '../../utils/repositoryInMemory/ProductInMemoryRepository';
import { Product } from '../../../src/domain/entities/Product';
import ProductCreateUseCase from '../../../src/app/useCase/Product/ProductCreateUseCase';
import ProductFindByIdUseCase from '../../../src/app/useCase/Product/ProductFindByIdUseCase';
import assert from "assert";

const categoryRepository = new ProductCategoryInMemoryRepository();
const mockCategoriesList: ProductCategory[] = [
  { name: "Lanche", id: 1 },
  { name: "Acompanhamento", id: 2 },
  { name: "Bebida", id: 3 },
]

const productRepository = new ProductInMemoryRepository();
const mockedProduct: Product = {
  category: mockCategoriesList[0],
  description: "Teste description",
  name: "Teste",
  price: 15.0,
  id: 1,
}

const createUseCase = new ProductCreateUseCase(productRepository, categoryRepository);
let findUseCase = new ProductFindByIdUseCase(productRepository);

Given('inicio a obtenção do produto passando o id {int} como parametro', async function (int) {
  if (int == 1) await saveMockProduct(mockedProduct);
  findUseCase = new ProductFindByIdUseCase(productRepository);
  this.result = [await findUseCase.execute(int)];
});

Then('o resultado deve ser de sucesso', function () {
  return assert.deepStrictEqual(findUseCase.hasErrors(), false);
});

Then('deve retornar {int} item', function (int) {
  return assert.equal(this.result.length, int);
});

Then('o resultado deve ser de erro', function () {
  return assert.deepStrictEqual(findUseCase.hasErrors(), true);
});

Then('deve retornar a mensagem de erro {string}', function (string) {
  return assert.deepStrictEqual(findUseCase.getErrors()[0].message, string);
});

async function saveMockProduct(mock: Product): Promise<Product | null> {
  const created = await createUseCase.execute(mock);
  return created;
}