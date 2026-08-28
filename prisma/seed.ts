import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { services, plans, trainers, galleryImages } from "../lib/data";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = "luisdamiandam@gmail.com";
  const adminPassword = "Admin1234!";

  const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (!existingAdmin) {
    await prisma.user.create({
      data: {
        name: "Administrador",
        email: adminEmail,
        passwordHash: await bcrypt.hash(adminPassword, 10),
        role: "ADMIN",
      },
    });
    console.log(`Usuario admin creado: ${adminEmail} / ${adminPassword}`);
  }

  if ((await prisma.plan.count()) === 0) {
    await prisma.plan.createMany({
      data: plans.map((p, i) => ({
        name: p.name,
        icon: p.icon,
        priceMonthly: p.priceMonthly,
        featured: Boolean(p.featured),
        benefits: p.benefits,
        order: i,
      })),
    });
  }

  if ((await prisma.service.count()) === 0) {
    await prisma.service.createMany({
      data: services.map((s, i) => ({
        icon: s.icon,
        name: s.name,
        description: s.description,
        schedule: s.schedule,
        image: s.image,
        order: i,
      })),
    });
  }

  if ((await prisma.trainer.count()) === 0) {
    await prisma.trainer.createMany({
      data: trainers.map((t, i) => ({
        name: t.name,
        specialty: t.specialty,
        certification: t.certification,
        initials: t.initials,
        photo: t.photo,
        order: i,
      })),
    });
  }

  if ((await prisma.galleryItem.count()) === 0) {
    await prisma.galleryItem.createMany({
      data: galleryImages.map((g, i) => ({
        label: g.label,
        src: g.src,
        order: i,
      })),
    });
  }

  if ((await prisma.emailTemplate.count()) === 0) {
    await prisma.emailTemplate.createMany({
      data: [
        {
          key: "bienvenida",
          name: "Bienvenida",
          subject: "¡Bienvenido a Power Fitness Gym!",
          body: "Hola {{nombre}},\n\nGracias por unirte a Power Fitness Gym. Tu membresía ya está activa.",
        },
        {
          key: "recordatorio_clase",
          name: "Recordatorio de clase",
          subject: "Tu clase empieza pronto",
          body: "Hola {{nombre}},\n\nTe recordamos que tu clase de {{clase}} empieza a las {{hora}}.",
        },
        {
          key: "vencimiento_membresia",
          name: "Vencimiento de membresía",
          subject: "Tu membresía está por vencer",
          body: "Hola {{nombre}},\n\nTu membresía vence el {{fecha}}. Renueva para no perder tu acceso.",
        },
        {
          key: "promocion",
          name: "Promoción",
          subject: "Tenemos una promoción para ti",
          body: "Hola {{nombre}},\n\nAprovecha nuestra promoción especial: {{detalle}}.",
        },
        {
          key: "stock_bajo",
          name: "Alerta de stock bajo",
          subject: "Alerta: stock bajo en inventario",
          body: "El producto {{producto}} tiene stock bajo ({{stock}} unidades, mínimo {{minimo}}).",
        },
      ],
    });
  }

  console.log("Seed completo.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
