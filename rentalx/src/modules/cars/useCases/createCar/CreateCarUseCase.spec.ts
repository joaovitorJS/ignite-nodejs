import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      brand: "Brand",
      category_id: "category-id",
      daily_rate: 100,
      description: "Description car",
      fine_amount: 60,
      license_plate: "ABC-7213",
      name: "Name car",
    });

    expect(car).toHaveProperty("id");
  });

  it("should not be able to create a car with exists license plate", async () => {
    await createCarUseCase.execute({
      brand: "Brand",
      category_id: "category-id",
      daily_rate: 100,
      description: "Description car",
      fine_amount: 60,
      license_plate: "ABC-7213",
      name: "Name car 1",
    });

    await expect(
      createCarUseCase.execute({
        brand: "Brand",
        category_id: "category-id",
        daily_rate: 100,
        description: "Description car",
        fine_amount: 60,
        license_plate: "ABC-7213",
        name: "Name car 2",
      })
    ).rejects.toEqual(new AppError("Car already exists!"));
  });

  it("should be able to create a car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      brand: "Brand",
      category_id: "category-id",
      daily_rate: 100,
      description: "Description car",
      fine_amount: 60,
      license_plate: "ABC-7213",
      name: "Name car",
    });

    expect(car.available).toEqual(true);
  });
});
