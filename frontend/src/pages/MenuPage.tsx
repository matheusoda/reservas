import { useEffect, useState } from 'react';
import { fetchCategories, fetchMenuItems } from '../api';

import { Category, MenuItem } from '../types';
import { Card } from 'primereact/card';
import './style.css'
import { ProgressSpinner } from 'primereact/progressspinner';

export default function MenuPage() {

    const [categories, setCategories] = useState([]);
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState<boolean>(false)
    useEffect(() => {
        setLoading(true)
        const loadData = async () => {
            try {
                const fetchedCategories = await fetchCategories();
                const fetchedMenuItems = await fetchMenuItems();

                // Ordenar os dados ordem alfabética
                fetchedCategories.sort((a: Category, b: Category) => a.name.localeCompare(b.name));
                fetchedMenuItems.sort((a: MenuItem, b: MenuItem) => a.name.localeCompare(b.name));

                setCategories(fetchedCategories);
                setMenuItems(fetchedMenuItems);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false)
            }
        };

        loadData();
    }, []);

    return (
        <Card className="py-4 px-2">
            <p className='text-2xl font-semibold'>Cardápio</p>
            {loading ? (
                <ProgressSpinner />
            ) :
                <div className="menu-scrollable" style={{ maxHeight: '70vh', overflowY: 'auto', padding: '0 1rem' }}>
                    <div className="menu-grid">
                        {categories.map((category: Category, index) => (
                            <div key={category.id} className="category-section">
                                <p className='text-1xl mt-6 font-semibold'>{category.name}</p>
                                <div className="menu-items grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {menuItems
                                        .filter((item: MenuItem) => item.categoryId === category.id)
                                        .map((item: MenuItem) => (
                                            <div key={item.id} className="menu-item bg-white border rounded-lg p-4 shadow-md">
                                                <h4 className="text-lg">{item.name}</h4>
                                                <p className="text-gray-600">R$ {item.price.toFixed(2)}</p>
                                                <p className="mt-2">{item.description}</p>
                                            </div>
                                        ))}
                                </div>
                                {index < categories.length - 1 && (
                                    <hr className="my-4 border-t border-gray-300" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            }
        </Card>
    );

    //   return (
    //     <div className="menu-container">
    //         <h1>Menu do Restaurante</h1>
    //         <TabView>
    //             {categories.map((category: Category) => (
    //                 <TabPanel key={category.id} header={category.name}>
    //                     <div className="p-grid">
    //                         {menuItems
    //                             .filter((item: MenuItem) => item.categoryId === category.id)
    //                             .map((item: MenuItem) => (
    //                                 <div key={item.id} className="p-col-12 p-md-4">
    //                                     <Card title={item.name} subTitle={`R$ ${item.price.toFixed(2)}`}>
    //                                         <p>{item.description}</p>
    //                                     </Card>
    //                                 </div>
    //                             ))}
    //                     </div>
    //                 </TabPanel>
    //             ))}
    //         </TabView>
    //     </div>
    // );

    // return (
    //   <div>
    //     <h2>Categorias</h2>
    //     <ul>
    //       {categories.map((category: Category) => (
    //         <li key={category.id}>{category.name}</li>
    //       ))}
    //     </ul>

    //     <h2>Itens do Menu</h2>
    //     <ul>
    //       {menuItems.map((item: MenuItem) => (
    //         <li key={item.id}>
    //           {item.name} - R$ {item.price}
    //         </li>
    //       ))}
    //     </ul>
    //   </div>
    // );
    // };

}

