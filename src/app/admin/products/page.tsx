'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import DataTable from '@/components/admin/DataTable';
import { createColumnHelper } from '@tanstack/react-table';
import Modal from '@/components/admin/Modal';
import ProductForm from '@/components/admin/ProductForm';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  created_at: string;
}

const columnHelper = createColumnHelper<Product>();

const columns = [
  columnHelper.accessor('name', {
    header: 'Name',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('description', {
    header: 'Description',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('price', {
    header: 'Price',
    cell: (info) => `$${info.getValue().toFixed(2)}`,
  }),
  columnHelper.accessor('category', {
    header: 'Category',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('created_at', {
    header: 'Created At',
    cell: (info) => new Date(info.getValue()).toLocaleDateString(),
  }),
];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching products:', error);
      return;
    }

    setProducts(data || []);
    setIsLoading(false);
  };

  const handleAddProduct = async (data: Omit<Product, 'id' | 'created_at'>) => {
    const { error } = await supabase.from('products').insert([data]);

    if (error) {
      console.error('Error adding product:', error);
      alert('Error adding product');
      return;
    }

    setIsModalOpen(false);
    fetchProducts();
  };

  const handleEditProduct = async (data: Omit<Product, 'id' | 'created_at'>) => {
    if (!selectedProduct) return;

    const { error } = await supabase
      .from('products')
      .update(data)
      .eq('id', selectedProduct.id);

    if (error) {
      console.error('Error updating product:', error);
      alert('Error updating product');
      return;
    }

    setIsModalOpen(false);
    setSelectedProduct(null);
    fetchProducts();
  };

  const handleDeleteProduct = async (product: Product) => {
    if (confirm('Are you sure you want to delete this product?')) {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', product.id);

      if (error) {
        console.error('Error deleting product:', error);
        alert('Error deleting product');
        return;
      }

      fetchProducts();
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => {
            setSelectedProduct(null);
            setIsModalOpen(true);
          }}
        >
          Add Product
        </button>
      </div>

      <DataTable
        data={products}
        columns={columns}
        onEdit={(product) => {
          setSelectedProduct(product);
          setIsModalOpen(true);
        }}
        onDelete={handleDeleteProduct}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProduct(null);
        }}
        title={selectedProduct ? 'Edit Product' : 'Add Product'}
      >
        <ProductForm
          initialData={selectedProduct || undefined}
          onSubmit={selectedProduct ? handleEditProduct : handleAddProduct}
          onCancel={() => {
            setIsModalOpen(false);
            setSelectedProduct(null);
          }}
        />
      </Modal>
    </div>
  );
} 