import { Given, Then } from "@cucumber/cucumber";
import ProductCategoryInMemoryRepository from "../../utils/repositoryInMemory/ProductCategoryInMemoryRepository";
import ProductCategoryUpdateUseCase from '../../../src/app/useCase/ProductCategory/ProductCategoryUpdateUseCase';
import { ProductCategory } from "../../../src/domain/entities/ProductCategory";
import assert from "assert";

const categoryRepository = new ProductCategoryInMemoryRepository();
const mockedCategory: ProductCategory = {
  name: "Lanche",
  id: 1
}

let updateUseCase: ProductCategoryUpdateUseCase;

Given('inicio a atualização da categoria passando o id {int} como parametro', async function (int) {
  if (int == 1) categoryRepository.categories.push(mockedCategory);
  else categoryRepository.categories = [];
  updateUseCase = new ProductCategoryUpdateUseCase(categoryRepository);
  await updateUseCase.execute({ ...mockedCategory, name: "Acompanhamento" });
});

Then('o resultado deve ser de sucesso ao atualizar uma categoria', function () {
  return assert.deepStrictEqual(updateUseCase.hasErrors(), false);
});

Then('o resultado deve ser de erro ao tentar atualizar uma categoria', function () {
  return assert.deepStrictEqual(updateUseCase.hasErrors(), true);
});