import Express from "express";
import path from "path";
import fs from "fs/promises";
import nodemailer from "nodemailer";

const app = Express();

const PORT = process.env.PORT || 3000;

app.use(Express.static(path.join(__dirname, 'frontend')));
app.use(Express.json()); 

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

app.get("/", (req, res) => {
    res.send(path.join(__dirname, 'frontend', 'index.html'));
});

// Endpoint for adding a review
app.post("/api/reviews/:itemId", async (req, res) => {
    try {
        const itemId = req.params.itemId;
        const newReview = req.body.review;

        // Load existing reviews from the file
        const reviewsFilePath = path.join(__dirname, 'frontend', 'reviews.json');
        const existingReviews = JSON.parse(await fs.readFile(reviewsFilePath, 'utf-8'));

        // Add the new review for the specified item
        existingReviews[itemId] = [...(existingReviews[itemId] || []), newReview];

        // Save the updated reviews back to the file
        await fs.writeFile(reviewsFilePath, JSON.stringify(existingReviews, null, 2));

        res.status(200).json({ success: true, message: "Review added successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error." });
    }
});

// Endpoint for fetching reviews
app.get("/api/reviews/:itemId", async (req, res) => {
    try {
        const itemId = req.params.itemId;

        // Load reviews from the file
        const reviewsFilePath = path.join(__dirname, 'frontend', 'reviews.json');
        const reviews = JSON.parse(await fs.readFile(reviewsFilePath, 'utf-8'));

        // Return reviews for the specified item
        res.status(200).json({ success: true, reviews: reviews[itemId] || [] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error." });
    }
});

// Endpoint for sending contact form submissions via email
app.post("/api/contact-us", async (req, res) => {
    try {
        const { name, email, questionType, message } = req.body;

        // Set up the Nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'wendywooden14@gmail.com',
                pass: 'glpv fhto zrng fogn',
            },
        });

        // Set up email content
        const mailOptions = {
            from: 'wendywooden14@gmail.com',
            to: 'wendywooden14+@gmail.com',
            subject: 'Customer Message from Aurora Shop',
            text: `
                Name: ${name}
                Email: ${email}
                Question Type: ${questionType}
                Message: ${message}
            `,
        };

        // Send email
        await transporter.sendMail(mailOptions);

        res.status(200).json({ success: true, message: "Email sent successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error." });
    }
});