import { Router } from "express";
import Offer from "../../../../../Models/Offer";
import isBusiness from "../../../../middleware/isBusiness";

const ROUTE = "/business/offers/:offerId";

export default Router({ mergeParams: true }).put(
  ROUTE,
  isBusiness,
  async (req, res) => {
    const { offerId } = req.params;
    const [product] = await req.business!.$get("products", {
      include: [{ model: Offer, where: { id: offerId } }]
    });
    if (!product) return res.sendStatus(404);
    const [offer] = product.offers;
    if (!offer) return res.sendStatus(404);

    res.json(await offer.update(req.body, { returning: true }));
  }
);
