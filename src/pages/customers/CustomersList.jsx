import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import CustomersTable from '../../components/customers/CustomersTable';
import CustomerProfileDrawer from '../../components/customers/CustomerProfileDrawer';

export default function CustomersList() {
  const { customers, isLoading, searchQuery } = useOutletContext();
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const filteredCustomers = customers.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.anon_id && c.anon_id.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSearch;
  });

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <CustomersTable
        customers={filteredCustomers}
        isLoading={isLoading}
        onSelectCustomer={setSelectedCustomer}
      />
      <CustomerProfileDrawer
        customer={selectedCustomer}
        onClose={() => setSelectedCustomer(null)}
      />
    </div>
  );
}
