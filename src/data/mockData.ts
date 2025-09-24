import { Order, Product, Group } from '@/types'

export const products: Product[] = [
  
  {
    id: 1,
    serialNumber: 'SN-001',
    isNew: true,
    photo: 'https://picsum.photos/200/150?random=1',//picsum.photos/200/150?random=1',
    title: 'Samsung 27" 4K Monitor U28E590D',
    type: 'Monitors',
    specification: '4K UHD, 28", 60Hz, AMD FreeSync',
    guarantee: {
      start: '2017-06-04 12:09:33',
      end: '2025-06-08 12:09:33'
    },
    price: [
      { value: 2500, symbol: 'USD', isDefault: false },
      { value: 250000.50, symbol: 'UAH', isDefault: true }
    ],
    order: 1,
    date: '2017-06-12 12:09:33'
  },
  {
    id: 2,
    serialNumber: 'SN-002',
    isNew: true,
    photo: 'https://picsum.photos/200/150?random=2',//picsum.photos/200/150?random=2',
    title: 'Dell UltraSharp 24" U2419H',
    type: 'Monitors',
    specification: 'Full HD, 24", IPS, USB-C',
    guarantee: {
      start: '2017-06-04 12:09:33',
      end: '2025-06-08 12:09:33'
    },
    price: [
      { value: 1800.85, symbol: 'USD', isDefault: false },
      { value: 45000.25, symbol: 'UAH', isDefault: true }
    ],
    order: 1,
    date: '2017-06-12 12:09:33'
  },
  
  {
    id: 3,
    serialNumber: 'SN-003',
    isNew: true,
    photo: 'https://picsum.photos/200/150?random=3',
    title: 'Logitech MX Keys Wireless Keyboard',
    type: 'Keyboards',
    specification: 'Wireless, Backlit, Multi-device',
    guarantee: {
      start: '2017-06-04 12:09:33',
      end: '2025-06-08 12:09:33'
    },
    price: [
      { value: 120, symbol: 'USD', isDefault: false },
      { value: 3600, symbol: 'UAH', isDefault: true }
    ],
    order: 2,
    date: '2017-06-12 12:09:33'
  },
  {
    id: 4,
    serialNumber: 'SN-004',
    isNew: true,
    photo: 'https://picsum.photos/200/150?random=4',
    title: 'Corsair K95 RGB Platinum XT',
    type: 'Keyboards',
    specification: 'Mechanical, RGB, Cherry MX Speed',
    guarantee: {
      start: '2017-06-04 12:09:33',
      end: '2025-06-08 12:09:33'
    },
    price: [
      { value: 200, symbol: 'USD', isDefault: false },
      { value: 6000, symbol: 'UAH', isDefault: true }
    ],
    order: 2,
    date: '2017-06-12 12:09:33'
  },
  
  {
    id: 5,
    serialNumber: 'SN-005',
    isNew: true,
    photo: 'https://picsum.photos/200/150?random=5',
    title: 'Logitech MX Master 3 Wireless Mouse',
    type: 'Mice',
    specification: 'Wireless, Ergonomic, 4000 DPI',
    guarantee: {
      start: '2017-06-04 12:09:33',
      end: '2025-06-08 12:09:33'
    },
    price: [
      { value: 100, symbol: 'USD', isDefault: false },
      { value: 3000, symbol: 'UAH', isDefault: true }
    ],
    order: 3,
    date: '2017-06-12 12:09:33'
  },
  {
    id: 6,
    serialNumber: 'SN-006',
    isNew: true,
    photo: 'https://picsum.photos/200/150?random=6',
    title: 'Razer DeathAdder V2 Gaming Mouse',
    type: 'Mice',
    specification: 'Gaming, 20000 DPI, Optical Sensor',
    guarantee: {
      start: '2017-06-04 12:09:33',
      end: '2025-06-08 12:09:33'
    },
    price: [
      { value: 80, symbol: 'USD', isDefault: false },
      { value: 2400, symbol: 'UAH', isDefault: true }
    ],
    order: 3,
    date: '2017-06-12 12:09:33'
  },
  
  {
    id: 7,
    serialNumber: 'SN-007',
    isNew: true,
    photo: 'https://picsum.photos/200/150?random=7',
    title: 'Intel Core i7-12700K Processor',
    type: 'Processors',
    specification: '12th Gen, 12 cores, 3.6GHz base',
    guarantee: {
      start: '2017-06-04 12:09:33',
      end: '2025-06-08 12:09:33'
    },
    price: [
      { value: 400, symbol: 'USD', isDefault: false },
      { value: 12000, symbol: 'UAH', isDefault: true }
    ],
    order: 1,
    date: '2017-06-12 12:09:33'
  },
  {
    id: 8,
    serialNumber: 'SN-008',
    isNew: true,
    photo: 'https://picsum.photos/200/150?random=8',
    title: 'AMD Ryzen 7 5800X Processor',
    type: 'Processors',
    specification: 'Zen 3, 8 cores, 3.8GHz base',
    guarantee: {
      start: '2017-06-04 12:09:33',
      end: '2025-06-08 12:09:33'
    },
    price: [
      { value: 350, symbol: 'USD', isDefault: false },
      { value: 10500, symbol: 'UAH', isDefault: true }
    ],
    order: 2,
    date: '2017-06-12 12:09:33'
  },
  
  {
    id: 9,
    serialNumber: 'SN-009',
    isNew: true,
    photo: 'https://picsum.photos/200/150?random=9',
    title: 'NVIDIA GeForce RTX 4070 Ti',
    type: 'Graphics Cards',
    specification: '12GB GDDR6X, Ray Tracing, DLSS 3',
    guarantee: {
      start: '2017-06-04 12:09:33',
      end: '2025-06-08 12:09:33'
    },
    price: [
      { value: 800, symbol: 'USD', isDefault: false },
      { value: 24000, symbol: 'UAH', isDefault: true }
    ],
    order: 1,
    date: '2017-06-12 12:09:33'
  },
  {
    id: 10,
    serialNumber: 'SN-010',
    isNew: true,
    photo: 'https://picsum.photos/200/150?random=10',
    title: 'AMD Radeon RX 7800 XT',
    type: 'Graphics Cards',
    specification: '16GB GDDR6, RDNA 3, FSR 3',
    guarantee: {
      start: '2017-06-04 12:09:33',
      end: '2025-06-08 12:09:33'
    },
    price: [
      { value: 500, symbol: 'USD', isDefault: false },
      { value: 15000, symbol: 'UAH', isDefault: true }
    ],
    order: 2,
    date: '2017-06-12 12:09:33'
  },
  
  {
    id: 11,
    serialNumber: 'SN-011',
    isNew: true,
    photo: 'https://picsum.photos/200/150?random=11',
    title: 'ASUS ROG Strix Z790-E Gaming WiFi',
    type: 'Motherboards',
    specification: 'LGA 1700, DDR5, WiFi 6E, RGB',
    guarantee: {
      start: '2017-06-04 12:09:33',
      end: '2025-06-08 12:09:33'
    },
    price: [
      { value: 450, symbol: 'USD', isDefault: false },
      { value: 13500, symbol: 'UAH', isDefault: true }
    ],
    order: 1,
    date: '2017-06-12 12:09:33'
  },
  {
    id: 12,
    serialNumber: 'SN-012',
    isNew: true,
    photo: 'https://picsum.photos/200/150?random=12',
    title: 'MSI MAG B550 Tomahawk',
    type: 'Motherboards',
    specification: 'AM4, DDR4, PCIe 4.0, USB-C',
    guarantee: {
      start: '2017-06-04 12:09:33',
      end: '2025-06-08 12:09:33'
    },
    price: [
      { value: 150, symbol: 'USD', isDefault: false },
      { value: 4500, symbol: 'UAH', isDefault: true }
    ],
    order: 2,
    date: '2017-06-12 12:09:33'
  }
]

export const orders: Order[] = [
  {
    id: 1,
    title: 'Длинное предлинное длиннючее название прихода',
    date: '2017-04-06 12:09:33',
    description: 'Описание прихода 1',
    products: products.filter(p => p.order === 1)
  },
  {
    id: 2,
    title: 'Длинное название прихода',
    date: '2017-09-06 12:09:33',
    description: 'Описание прихода 2',
    products: products.filter(p => p.order === 2)
  },
  {
    id: 3,
    title: 'Христорождественский Александр',
    date: '2017-06-06 12:09:33',
    description: 'Описание прихода 3',
    products: products.filter(p => p.order === 3)
  },
  {
    id: 4,
    title: 'Длинное предлинное длиннючее название прихода',
    date: '2017-02-06 12:09:33',
    description: 'Описание прихода 4',
    products: products.filter(p => p.order === 1)
  }
]

export const groups: Group[] = [
  {
    id: 1,
    title: 'Длинное предлинное длиннючее название группы',
    description: 'Группа для офисного оборудования',
    products: products.filter(p => p.type === 'Monitors' || p.type === 'Keyboards'),
    createdAt: '2017-06-01 10:00:00',
    updatedAt: '2017-06-15 14:30:00'
  },
  {
    id: 2,
    title: 'Игровое оборудование',
    description: 'Группа для игровых устройств',
    products: products.filter(p => p.type === 'Graphics Cards' || p.type === 'Processors'),
    createdAt: '2017-06-05 12:00:00',
    updatedAt: '2017-06-20 16:45:00'
  },
  {
    id: 3,
    title: 'Комплектующие ПК',
    description: 'Группа для компонентов компьютера',
    products: products.filter(p => p.type === 'Motherboards' || p.type === 'Processors'),
    createdAt: '2017-06-10 09:15:00',
    updatedAt: '2017-06-25 11:20:00'
  },
  {
    id: 4,
    title: 'Периферийные устройства',
    description: 'Группа для периферии',
    products: products.filter(p => p.type === 'Mice' || p.type === 'Keyboards'),
    createdAt: '2017-06-12 15:30:00',
    updatedAt: '2017-06-28 13:10:00'
  }
]

export const user = {
  id: 1,
  name: 'Admin',
  avatar: 'https://picsum.photos/100/100?random=user',
  email: 'Admin@example.com'
}
