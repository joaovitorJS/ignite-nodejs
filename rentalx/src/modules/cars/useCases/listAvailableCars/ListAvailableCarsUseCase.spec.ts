import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it("should be able to list all available cars", async () => {
    await carsRepositoryInMemory.create({
      name: "Car1",
      brand: "Brand",
      category_id: "example-category-id",
      daily_rate: 100,
      description: "Description car",
      fine_amount: 60,
      license_plate: "ABC-1234",
    });

    await carsRepositoryInMemory.create({
      name: "CarNotAvailable",
      brand: "Brand",
      category_id: "example-category-id",
      daily_rate: 100,
      description: "Description car",
      fine_amount: 60,
      license_plate: "ABC-1235",
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toHaveLength(2);
  });

  it("should be able to list all available cars by brand", async () => {
    await carsRepositoryInMemory.create({
      name: "Car1",
      brand: "Brand",
      category_id: "example-category-id",
      daily_rate: 100,
      description: "Description car",
      fine_amount: 60,
      license_plate: "ABC-1234",
    });

    await carsRepositoryInMemory.create({
      name: "CarNotAvailable",
      brand: "Brand X",
      category_id: "example-category-id",
      daily_rate: 100,
      description: "Description car",
      fine_amount: 60,
      license_plate: "ABC-1235",
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "Brand",
    });

    expect(cars).toHaveLength(1);
  });

  it("should be able to list all available cars by name", async () => {
    await carsRepositoryInMemory.create({
      name: "Car1",
      brand: "Brand",
      category_id: "example-category-id",
      daily_rate: 100,
      description: "Description car",
      fine_amount: 60,
      license_plate: "ABC-1234",
    });

    await carsRepositoryInMemory.create({
      name: "Car2",
      brand: "Brand X",
      category_id: "example-category-id",
      daily_rate: 100,
      description: "Description car",
      fine_amount: 60,
      license_plate: "ABC-1235",
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: "Car1",
    });

    expect(cars).toHaveLength(1);
  });

  it("should be able to list all available cars by category", async () => {
    await carsRepositoryInMemory.create({
      name: "Car1",
      brand: "Brand",
      category_id: "example-category-id-1",
      daily_rate: 100,
      description: "Description car",
      fine_amount: 60,
      license_plate: "ABC-1234",
    });

    await carsRepositoryInMemory.create({
      name: "Car2",
      brand: "Brand X",
      category_id: "example-category-id-2",
      daily_rate: 100,
      description: "Description car",
      fine_amount: 60,
      license_plate: "ABC-1235",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "example-category-id-1",
    });

    expect(cars).toHaveLength(1);
  });
});
