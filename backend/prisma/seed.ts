// prisma/seed.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const categorias = [
    { name: "Entradas" },
    { name: "Pratos Principais" },
    { name: "Sobremesas" },
    { name: "Bebidas" },
    { name: "Lanches" },
    { name: "Saladas" },
    { name: "Massas" },
    { name: "Carnes" },
    { name: "Peixes e Frutos do Mar" },
    { name: "Acompanhamentos" }
];

const mesas = [
    { id: 1, name: "Mesa 1" },
    { id: 2, name: "Mesa 2" },
    { id: 3, name: "Mesa 3" },
    { id: 4, name: "Mesa 4" },
    { id: 5, name: "Mesa 5" },
    { id: 6, name: "Mesa 6" },
    { id: 7, name: "Mesa 7" },
    { id: 8, name: "Mesa 8" }
];

async function main() {
    for (const category of categorias) {
        const existingCategory = await prisma.category.findUnique({
            where: { name: category.name }
        });

        if (!existingCategory) {
            await prisma.category.create({
                data: {
                    name: category.name
                }
            });
            console.log(`Categoria '${category.name}' criada.`);
        } else {
            console.log(`Categoria '${category.name}' já existe.`);
        }
    }

    for (const table of mesas) {
        const existingTable = await prisma.table.findUnique({
            where: { id: table.id }
        });

        if (!existingTable) {
            await prisma.table.create({
                data: {
                    id: table.id,
                    name: table.name
                }
            });
            console.log(`Mesa '${table.name}' criada.`);
        } else {
            console.log(`Mesa '${table.name}' já existe.`);
        }
    }

    const categoriasDB = await prisma.category.findMany();
    const menuItems = [
        {
            name: "Salada Caesar",
            description: "Salada com alface, queijo parmesão e croutons.",
            price: 25.0,
            categoryName: "Entradas"
        },
        {
            name: "Bruschetta de Tomate e Manjericão",
            description:
                "Pão italiano com tomates frescos, manjericão e azeite",
            price: 15.0,
            categoryName: "Entradas"
        },
        {
            name: "Mini Coxinhas",
            description: "Coxinhas de frango empanadas e crocantes",
            price: 12.0,
            categoryName: "Entradas"
        },
        {
            name: "Filé à parmegiana",
            description: "Filé empanado com queijo e molho de tomate.",
            price: 45.0,
            categoryName: "Pratos Principais"
        },
        {
            name: "Bife à Milanesa",
            description:
                "Bife empanado e frito, acompanhado de arroz e batatas",
            price: 40.0,
            categoryName: "Pratos Principais"
        },
        {
            name: "Spaghetti Carbonara",
            description:
                "Espaguete ao molho cremoso de ovos, queijo e pancetta",
            price: 35.0,
            categoryName: "Pratos Principais"
        },
        {
            name: "Petit Gateau",
            description: "Bolo quente de chocolate com sorvete de baunilha",
            price: 20.0,
            categoryName: "Sobremesas"
        },
        {
            name: "Cheesecake de Frutas Vermelhas",
            description: "Torta de queijo com calda de frutas vermelhas",
            price: 18.0,
            categoryName: "Sobremesas"
        },
        {
            name: "Suco Natural",
            description: "Sucos variados de frutas da estação",
            price: 8.0,
            categoryName: "Bebidas"
        },
        {
            name: "Caipirinha",
            description: "Caipirinha clássica com limão e cachaça",
            price: 15.0,
            categoryName: "Bebidas"
        },
        {
            name: "Hambúrguer Clássico",
            description:
                "Hambúrguer de carne bovina com queijo, alface e tomate",
            price: 30.0,
            categoryName: "Lanches"
        },
        {
            name: "Sanduíche Natural",
            description:
                "Sanduíche de frango desfiado com maionese e legumes frescos",
            price: 20.0,
            categoryName: "Lanches"
        },
        {
            name: "Salada Caprese",
            description: "Tomates, muçarela de búfala e manjericão fresco",
            price: 18.0,
            categoryName: "Saladas"
        },
        {
            name: "Salada de Frutas",
            description: "Frutas da estação frescas",
            price: 12.0,
            categoryName: "Saladas"
        },
        {
            name: "Lasanha à Bolonhesa",
            description: "Massa recheada com carne, queijo e molho de tomate",
            price: 38.0,
            categoryName: "Massas"
        },
        {
            name: "Fettuccine Alfredo",
            description: "Massa ao molho cremoso de queijo e creme de leite",
            price: 35.0,
            categoryName: "Massas"
        },
        {
            name: "Picanha Grelhada",
            description: "Picanha grelhada com farofa e vinagrete",
            price: 60.0,
            categoryName: "Carnes"
        },
        {
            name: "Frango à Parmegiana",
            description: "Filé de frango empanado com molho de tomate e queijo",
            price: 42.0,
            categoryName: "Carnes"
        },
        {
            name: "Salmão Grelhado",
            description: "Filé de salmão grelhado com batatas e legumes",
            price: 55.0,
            categoryName: "Peixes e Frutos do Mar"
        },
        {
            name: "Camarão à Provençal",
            description:
                "Camarões salteados no alho e óleo com arroz de açafrão",
            price: 65.0,
            categoryName: "Peixes e Frutos do Mar"
        },
        {
            name: "Batata Frita",
            description: "Batatas fritas crocantes",
            price: 10.0,
            categoryName: "Acompanhamentos"
        },
        {
            name: "Arroz Branco",
            description: "Arroz branco soltinho",
            price: 5.0,
            categoryName: "Acompanhamentos"
        }
    ];

    const dataToCreate = menuItems
        .map((item) => {
            const category = categoriasDB.find(
                (cat) => cat.name === item.categoryName
            );
            return category
                ? {
                      name: item.name,
                      description: item.description,
                      price: item.price,
                      categoryId: category.id // categoryId garantido como number
                  }
                : null;
        })
        .filter((item): item is Exclude<typeof item, null> => item !== null); // Filtra itens não nulos

    await prisma.menu.createMany({
        data: dataToCreate
    });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
