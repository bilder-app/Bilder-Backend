import { Request, Response } from "express";
import Category from "../../Models/Category";


export async function getAllCategories() {
  return Category.findAll()
}
