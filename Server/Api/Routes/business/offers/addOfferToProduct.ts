import isBusiness from "../../../middleware/isBusiness";
import Offer from "../../../../Models/Offer";
import { Router } from "express";

const ROUTE = "/business/offers/";

export default Router({ mergeParams: true }).post(
  ROUTE,
  isBusiness,
  async (req, res) => {
    const { productId, ...offerData } = req.body;
    const [product] = await req.business!.$get("products", {
      where: { id: productId }
    });
    if (!product) return res.sendStatus(404);
    const newOffer = await Offer.create(offerData);
    await product.$add("offer", newOffer);
    res.json(newOffer);
  }
);
