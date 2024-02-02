import { Given, Then } from "@cucumber/cucumber";
import ProductCategoryInMemoryRepository from "../../utils/repositoryInMemory/ProductCategoryInMemoryRepository";
import ProductCategoryCreateUseCase from '../../../src/app/useCase/ProductCategory/ProductCategoryCreateUseCase';
import { ProductCategory } from "../../../src/domain/entities/ProductCategory";
import assert from "assert";

const categoryRepository = new ProductCategoryInMemoryRepository();
const mockedCategory: ProductCategory = {
  name: "Lanche",
}

let createUseCase: ProductCategoryCreateUseCase;
let response: ProductCategory | null;

Given('chamo o método de criar pedido passando uma categoria válida', async function () {
  createUseCase = new ProductCategoryCreateUseCase(categoryRepository);
  response = await createUseCase.execute(mockedCategory);
});

Then('o resultado deve ser de sucesso ao criar uma categoria', function () {
  return assert.deepStrictEqual(createUseCase.hasErrors(), false);
});

Then('deve retornar a categoria criada', function () {
  return assert.deepStrictEqual(response?.name, mockedCategory.name);
});

Given('chamo o método de criar pedido passando uma categoria válida com um campo inválido', async function () {
  createUseCase = new ProductCategoryCreateUseCase(categoryRepository);
  response = await createUseCase.execute({ ...mockedCategory, id: 1 });
});

Then('o resultado deve ser de erro do tipo {string} ao tentar criar uma categoria', function (string) {
  assert.deepStrictEqual(createUseCase.hasErrors(), true);
  assert.deepStrictEqual(createUseCase.getErrors()[0].type, string);
});

Then('não deve retornar nenhuma categoria', function () {
  return assert.equal(response, null);
});