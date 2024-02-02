import { Given, Then } from "@cucumber/cucumber";
import ProductCategoryInMemoryRepository from "../../utils/repositoryInMemory/ProductCategoryInMemoryRepository";
import { ProductCategory } from "../../../src/domain/entities/ProductCategory";
import assert from "assert";
import ProductCategoryDeleteUseCase from '../../../src/app/useCase/ProductCategory/ProductCategoryDeleteUseCase';

const categoryRepository = new ProductCategoryInMemoryRepository();
const mockedCategory: ProductCategory = {
  name: "Lanche",
  id: 1
}

let deleteUseCase: ProductCategoryDeleteUseCase;

Given('inicio a remoção da categoria passando o id {int} como parametro', async function (int) {
  if (int == 1) categoryRepository.categories.push(mockedCategory);
  deleteUseCase = new ProductCategoryDeleteUseCase(categoryRepository);
  await deleteUseCase.execute(int);
});

Then('o resultado deve ser de sucesso ao remover uma categoria', function () {
  return assert.deepStrictEqual(deleteUseCase.hasErrors(), false);
});

Given('inicio a remoção da categoria passando o id {string} como parametro', async function (string) {
  deleteUseCase = new ProductCategoryDeleteUseCase(categoryRepository);
  await deleteUseCase.execute(string);
});

Then('o resultado deve ser de erro ao tentar remover uma categoria', function () {
  return assert.deepStrictEqual(deleteUseCase.hasErrors(), true);
});

Then('a mensagem de erro deve ser {string}', function (string) {
  return assert.deepStrictEqual(deleteUseCase.getErrors()[0].message, string);
});