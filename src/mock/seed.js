const seed = {
  currentVendorId: null,
  vendors: [
    {id:'v1', company:'Acme Supplies', contact:'John Doe', email:'john@acme.com', status:'Active', docs:[], createdAt: new Date().toISOString()},
    {id:'v2', company:'Global Parts', contact:'Jane Roe', email:'jane@global.com', status:'Pending', docs:[], createdAt: new Date().toISOString()}
  ],
  products: [
    {id:'p1', name:'Widget A', sku:'WIDGET-A', category:'Hardware', price:12.5, description:'Basic widget'},
  ],
  pos: [
  ],
  invoices: [],
  shipments: [],
  payments: []
}

export default seed
