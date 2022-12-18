const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {

    const items = req.body.cartItem

        const transformedItems = items.map((item) => ({
            price_data: {
                currency: "BRL",
                product_data: {
                    name: item.title,
                    images: [req.headers.origin+item.img_url],
                },
                unit_amount: parseInt(item.price) * 100,
            },
            quantity: item.quantity,
        }))

    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        line_items: transformedItems,
        mode: 'payment',
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/`,
      });
      res.json({"sessionURL": session.url});
    } catch (err) {
      console.log(err);
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}