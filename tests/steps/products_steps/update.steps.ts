import { Given, Then } from '@cucumber/cucumber';
import ProductCategoryInMemoryRepository from '../../utils/repositoryInMemory/ProductCategoryInMemoryRepository';
import { ProductCategory } from '../../../src/domain/entities/ProductCategory';
import ProductInMemoryRepository from '../../utils/repositoryInMemory/ProductInMemoryRepository';
import { Product } from '../../../src/domain/entities/Product';
import ProductCreateUseCase from '../../../src/app/useCase/Product/ProductCreateUseCase';
import { ProductUpdateUseCase, ProductUpdateBody } from '../../../src/app/useCase/Product/ProductUpdateUseCase';
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
let updateUseCase = new ProductUpdateUseCase(productRepository, categoryRepository);

Given('inicio a atualização do produto passando o id {int} como parametro', async function (int) {
  if (int == 1) await saveMockProduct(mockedProduct);
  else productRepository.products = [];
  categoryRepository.categories = mockCategoriesList;

  updateUseCase = new ProductUpdateUseCase(productRepository, categoryRepository);
  const bodyUpdate: ProductUpdateBody = {
    ...mockedProduct, name: "Novo nome",
    categoryId: mockedProduct.category.id!
  };
  await updateUseCase.execute(bodyUpdate);
});

Then('o resultado não deve retornar erros ao atualizar o produto', function () {
  return assert.deepStrictEqual(updateUseCase.hasErrors(), false);
});

Then('o resultado deve ser de erro ao atualizar o produto', function () {
  return assert.deepStrictEqual(updateUseCase.hasErrors(), true);
});

Then('deve retornar a mensagem de erro {string} ao tentar atualizar o produto', function (string) {
  return assert.deepStrictEqual(updateUseCase.getErrors()[0].message, string);
});

Given('inicio a atualização do produto passando um produto válido, mas com um ID {int} de categoria inválida como parametro', async function (int) {
  productRepository.products = [];
  categoryRepository.categories = mockCategoriesList;
  productRepository.products.push(mockedProduct);

  updateUseCase = new ProductUpdateUseCase(productRepository, categoryRepository);
  const bodyUpdate: ProductUpdateBody = {
    ...mockedProduct, name: "Novo nome",
    categoryId: int
  };
  await updateUseCase.execute(bodyUpdate);
});

Then('o resultado deve ser de erro ao tentar atualizar o produto com uma categoria não encontrada', function () {
  return assert.deepStrictEqual(updateUseCase.hasErrors(), true);
});

Then('deve retornar a mensagem de erro {string} ao tentar atualizar o produto com uma categoria inexistente', function (string) {
  return assert.deepStrictEqual(updateUseCase.getErrors()[0].message, string);
});

async function saveMockProduct(mock: Product): Promise<Product | null> {
  const created = await createUseCase.execute(mock);
  return created;
}