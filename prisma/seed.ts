import prisma from "@/lib/prisma";
import bcrypt from "bcrypt"
async function main() {
    await prisma.services.create({
        data : {
            title: "MVP",
            summary: "We specialize in custom MVP development, focusing on tailored prototyping services to meet diverse client needs and ensure rapid market launch.",
            description: "At the core of our services is a deep specialization in custom MVP (Minimum Viable Product) development, designed to help startups and enterprises validate ideas quickly, gather user feedback early, and accelerate time-to-market.<br/>We understand that no two products—or business visions—are alike. That’s why we focus on tailored prototyping and MVP solutions that align closely with your goals, target audience, and technical requirements. Our process is iterative, collaborative, and results-driven—ensuring that your MVP is not only functional but strategically built to test critical assumptions with minimal resources."
        }
    })

    await prisma.clientLogo.create({
        data : {
            name: "MVP",
            image: "https://res.cloudinary.com/dbd0v4epb/image/upload/v1759142443/client_logo/vbabho5vrgd.png"        
        }
    })

    const hashedPassword = await bcrypt.hash("admin123",10)

    await prisma.user.create({
        data: {
            name: "Admin",
            email: "admin@admin.com",
            password: hashedPassword,
        }
    })

    await prisma.testimonials.create({
        data : {
            name: "BRANDON LAU",
            company: "Manager, Global Solutions",
            message: "Highly responsive with keen attention to detail. Assisted in building my e-commerce platform, mapping transformative areas, resulting in exceptional customer experience.",
            clientLogo: "https://res.cloudinary.com/dbd0v4epb/image/upload/v1759142443/client_logo/vbabho5vrgd.png"
        }
    })

    await prisma.insights.create({
        data : {
            title: "Successful MVP Launches That Changed the Game",
            summary: "Discover the secrets behind game-changing MVP launches! From lean startups to industry giants,",
            description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna.",
            image: "https://res.cloudinary.com/dbd0v4epb/image/upload/v1759128787/success_stories/diedw81ytrb.png",
            slug: "successful-mvp-launches-that-changed-the-game"
        },
    })

    await prisma.successStories.create({
        data : {
            title: "Finconnect",
            summary: "Customer Relationship Management (CRM)",
            description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna.",
            image: "https://res.cloudinary.com/dbd0v4epb/image/upload/v1759128787/success_stories/diedw81ytrb.png",
            slug: "successful-mvp-launches-that-changed-the-game"
        },
    })
}

main()
    .then(() => {
        console.log("Seed data inserted")
    })
    .catch((e) => console.log(e))
    .finally(async () => {
        await prisma.$disconnect();
    })