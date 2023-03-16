import React, { useEffect, useState } from "react";
import IItem from "../models/item.type";
import { useForm } from "react-hook-form";
import instance from "../api/api";
import axios from "axios";

export default function AddItem() {
  const [items, setItems] = useState<IItem[]>([]);
  const {
    register,
    resetField,
    handleSubmit,
    formState: { errors },
  } = useForm<IItem>();

  const onSubmit = async (data: IItem) => {
    console.log(data);
    try {
      const response = await instance.post("/api/v1/items/addItem", data);
      if (response) {
        window.alert("Item has been added Successfully");
        setItems(items.concat(response.data));
        resetField("title");
        resetField("description");
      }
      if (!response) {
       window.alert("Item not added");
      }
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        window.alert("Item not added please try again later");
        return error.message;
      }
      return "An unexpected error occurred";
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    let dataFetched = false;

    async function fetchAllItems() {
      if (!dataFetched) {
        const response = await instance.get("/api/v1/items");
        console.log(response.data);
        setItems(response.data);
      }
    }
    fetchAllItems();
    return () => {
      dataFetched = true;
      controller.abort();
    };
  }, []);
  return (
    <div>
      <div>
        <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
          <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg sm:mt-50 ">
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <h3 className="text-4xl font-bold text-gray-600 mt-5 text-center mb-6">
                Add Item to List
              </h3>
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 undefined"
                >
                  Title
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="text"
                    placeholder="Enter title"
                    {...register("title", {
                      required: "Item title is required",
                    })}
                    className="block w-full h-10 mt-1 border border-solid"
                  />
                  {errors?.title && (
                    <p className="error text-red-600 text-center">
                      {errors.title.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-6">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 undefined"
                >
                  Description
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="text"
                    {...register("description", {
                      required: "Item Description is required",
                    })}
                    placeholder="Enter Description"
                    className="block w-full h-10 mt-1 border border-solid"
                  />
                  {errors?.description && (
                    <p className="error  text-red-600 text-center">
                      {errors.description.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center mt-4">
                <button
                  type="submit"
                  className=" block w-full  items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-blue-900 border border-transparent rounded-md active:bg-gray-900 false"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
          <div>
            {items.map((item: IItem, index) => (
              <div className="space-y-2 shadow-md mt-6 mb-3 ml-8 mr-8">
                <p className="text-blue-600 text-center">Item : {index + 1}</p>
                <h3 className="text-l font-semibold text-center">
                  Title : {item.title}
                </h3>
                <p className="text-gray-600 text-lg text-center">
                  Description : {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
