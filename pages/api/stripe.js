import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  console.log(req.body);

  if (req.method === "POST") {
    try {
      const params = {
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card", "boleto"],
        // billing_address_collection: 'required',
        shipping_address_collection: {
          allowed_countries: ["BR"],
        },
        // shipping_options: [{ shipping_rate: "shr_1Lgr8BJWaZYNgDCYOLMK356I" }],
        line_items: req.body.cartItems.map((item) => {
          const img = item.image[0].asset._ref;
          const newImage = img
            .replace(
              "image-",
              "https://cdn.sanity.io/images/3yun1dl7/production/"
            )
            .replace("-webp", ".webp");

          return {
            price_data: {
              currency: "brl",
              product_data: {
                name: item.name,
                images: [newImage],
              },
              unit_amount: item.price * 100,
            },
            //adjustable_quantity: {
            // enabled:true,
            //minimum: 1,
            //},
            quantity: item.quantity,
          };
        }),
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/canceled`,
        shipping_options : [{
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: Number(req.body.shippingCost.replace(',', '')),
              // amount: 10,
              currency: 'brl',
            },
            display_name: 'Frete',
            // delivery_estimate: {
            //   minimum: {
            //     unit: 'business_day',
            //     value: 5,
            //   },
            //   maximum: {
            //     unit: 'business_day',
            //     value: 7,
            //   },
            // },
          },
        }]
      };


      // params.shipping_options = [shippingOption];

      const session = await stripe.checkout.sessions.create(params);

      res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}