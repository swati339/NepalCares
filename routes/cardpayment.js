var express = require('express');
var router = express.Router();

const stripe = require('stripe')('your_stripe_secret_key');

const app = express();


router.get('/',function(req,res,next){
    res.render('cardpayment',{title:'cardpayment'});
});

app.use(express.json());

// Serve a simple HTML form for testing
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Handle the form submission
app.post('/verify-card', async (req, res) => {
  const { cardNumber, expMonth, expYear, cvc } = req.body;

  try {
    // Create a payment method using Stripe
    const paymentMethod = await stripe.paymentMethods.create({
      type: 'card',
      card: {
        number: cardNumber,
        exp_month: expMonth,
        exp_year: expYear,
        cvc,
      },
    });

    res.json({ success: true, message: 'Card details verified successfully!', paymentMethod });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error verifying card details.' });
  }
});

router.get('/donation',function(req,res,next){
    res.render('donations',{title:'Donations '})
})

module.exports = router;






//app.listen(PORT, () => {
  //console.log(`Server is running on http://localhost:${PORT}`);
//});
