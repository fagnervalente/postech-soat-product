import { Given, Then } from '@cucumber/cucumber';
import ProductCategoryInMemoryRepository from '../../utils/repositoryInMemory/ProductCategoryInMemoryRepository';
import { ProductCategory } from '../../../src/domain/entities/ProductCategory';
import ProductInMemoryRepository from '../../utils/repositoryInMemory/ProductInMemoryRepository';
import { Product } from '../../../src/domain/entities/Product';
import ProductCreateUseCase from '../../../src/app/useCase/Product/ProductCreateUseCase';
import ProductListByCategoryUseCase from '../../../src/app/useCase/Product/ProductListByCategoryUseCase';
import assert from "assert";

const categoryRepository = new ProductCategoryInMemoryRepository();
const mockCategoriesList: ProductCategory[] = [
  { name: "Lanche", id: 1 },
  { name: "Acompanhamento", id: 2 },
  { name: "Bebida", id: 3 },
]

const productRepository = new ProductInMemoryRepository();
const mockedProduct: Product = {
  category: { name: "Lanche", id: 1 },
  description: "Teste description",
  name: "Teste",
  price: 15.0,
  id: 1,
}

let listByCategoryUseCase: ProductListByCategoryUseCase;
let response: Product[] | null;

Given('inicio a obtenção do lista passando o id {int} da categoria Lanche', async function (int) {
  categoryRepository.categories = mockCategoriesList;
  productRepository.products.push(mockedProduct);
  listByCategoryUseCase = new ProductListByCategoryUseCase(productRepository, categoryRepository);
  response = await listByCategoryUseCase.execute(int);
});

Then('o resultado deve ser de sucesso ao obter a lista de produtos', function () {
  return assert.deepStrictEqual(listByCategoryUseCase.hasErrors(), false);
});

Then('a lista deve retornar com {int} produto', function (int) {
  return assert.deepStrictEqual(response?.length, int);
});

Given('inicio a obtenção do lista passando o id {int} da categoria Acompanhamento sem produtos vinculados', async function (int) {
  response = await listByCategoryUseCase.execute(int);
});

Then('o resultado deve ser de erro ao tentar obter a lista de produtos', function () {
  return assert.deepStrictEqual(listByCategoryUseCase.hasErrors(), true);
});

Then('o erro deve conter a mensagem {string}', function (string) {
  return assert.deepStrictEqual(listByCategoryUseCase.getErrors()[0].message, string);
});

Given('inicio a obtenção do lista passando o id {int} qualquer não registrado', async function (int) {
  response = await listByCategoryUseCase.execute(int);
});

Then('o resultado deve ser de erro ao tentar obter a lista de produtos com uma categoria inválida', function () {
  return assert.deepStrictEqual(listByCategoryUseCase.hasErrors(), true);
});