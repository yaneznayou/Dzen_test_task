import React, { createContext, useContext, useState, useEffect } from 'react'

interface LocaleContextType {
  locale: string
  setLocale: (locale: string) => void
  t: (key: string) => string
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined)

const translations = {
  ru: {
    common: {
      search: "Поиск",
      cancel: "ОТМЕНИТЬ",
      delete: "УДАЛИТЬ",
      add: "ДОБАВИТЬ",
      create: "СОЗДАТЬ",
      save: "СОХРАНИТЬ",
      edit: "РЕДАКТИРОВАТЬ",
      close: "ЗАКРЫТЬ",
      loading: "Загрузка...",
      error: "Ошибка",
      success: "Успешно",
      confirm: "Подтвердить",
      yes: "Да",
      no: "Нет",
      new: "Новый",
      used: "Б/У",
      free: "Свободен",
      inRepair: "В ремонте",
      active: "Активный",
      inactive: "Неактивный",
      available: "Доступен",
      unavailable: "Недоступен",
      reserved: "Зарезервирован",
      sold: "Продан",
      damaged: "Поврежден",
      maintenance: "На обслуживании",
      testing: "На тестировании",
      shipped: "Отправлен",
      delivered: "Доставлен",
      returned: "Возвращен",
      pending: "Ожидает",
      processing: "Обрабатывается",
      completed: "Завершен",
      cancelled: "Отменен",
      draft: "Черновик",
      published: "Опубликован",
      archived: "Архивирован",
      comingSoon: "Функционал будет добавлен в следующих версиях",
      underDevelopment: "В разработке",
      notImplemented: "Не реализовано",
      placeholder: "Заглушка"
    },
    navigation: {
      inventory: "INVENTORY",
      orders: "ПРИХОД",
      groups: "ГРУППЫ",
      products: "ПРОДУКТЫ",
      users: "ПОЛЬЗОВАТЕЛИ",
      settings: "НАСТРОЙКИ"
    },
    header: {
      activeSessions: "активных сессий",
      today: "Сегодня",
      monday: "Понедельник",
      tuesday: "Вторник",
      wednesday: "Среда",
      thursday: "Четверг",
      friday: "Пятница",
      saturday: "Суббота",
      sunday: "Воскресенье"
    },
    months: {
      january: "янв",
      february: "фев",
      march: "мар",
      april: "апр",
      may: "май",
      june: "июн",
      july: "июл",
      august: "авг",
      september: "сен",
      october: "окт",
      november: "ноя",
      december: "дек"
    },
    orders: {
      title: "Приходы",
      addNew: "Создать новый продукт",
      addExisting: "Добавить существующий",
      productsCount: "Продукта",
      total: "Итого",
      deleteConfirm: "Вы уверены, что хотите удалить этот приход?",
      noSelection: "Выберите приход"
    },
    products: {
      title: "Продукты",
      addNew: "Добавить продукт",
      type: "Тип",
      specification: "Спецификация",
      allTypes: "Все",
      allSpecs: "Все",
      status: "Статус",
      guarantee: "Гарантия",
      condition: "Состояние",
      price: "Цена",
      group: "Группа",
      order: "Приход",
      orderDate: "Дата прихода",
      actions: "Действия",
      from: "с",
      to: "по",
      deleteConfirm: "Вы уверены, что хотите удалить этот продукт?"
    },
    groups: {
      title: "Группы",
      addNew: "Создать группу",
      productsCount: "Продуктов",
      description: "Описание",
      deleteConfirm: "Вы уверены, что хотите удалить эту группу?",
      noSelection: "Выберите группу"
    },
    modals: {
      addProduct: {
        title: "Добавить продукт",
        productName: "Название продукта",
        productType: "Тип продукта",
        specification: "Спецификация",
        serialNumber: "Серийный номер",
        guaranteeStart: "Дата начала гарантии",
        guaranteeEnd: "Дата окончания гарантии",
        priceUsd: "Цена в USD",
        priceUah: "Цена в UAH",
        order: "Приход",
        condition: "Состояние",
        selectType: "Выберите тип",
        enterSpecification: "Введите спецификацию",
        enterSerialNumber: "Введите серийный номер",
        enterProductName: "Введите название продукта",
        submit: "ДОБАВИТЬ ПРОДУКТ"
      },
      addGroup: {
        title: "Создать группу",
        groupName: "Название группы",
        description: "Описание",
        selectProducts: "Выберите продукты",
        availableProducts: "Доступные продукты",
        selected: "Выбрано",
        selectAll: "Выбрать все",
        deselectAll: "Снять все",
        filterByType: "Фильтр по типу",
        allTypes: "Все типы",
        search: "Поиск",
        searchPlaceholder: "Поиск по названию или серийному номеру",
        noProducts: "Продукты не найдены",
        submit: "СОЗДАТЬ ГРУППУ"
      },
      addExistingProduct: {
        title: "Добавить существующий продукт в приход",
        addingToOrder: "Добавляем в приход",
        currentProductsCount: "Текущее количество продуктов",
        availableProducts: "Доступные продукты",
        noProductsAvailable: "Нет доступных продуктов для добавления",
        allProductsAdded: "Все продукты уже добавлены в этот приход",
        selected: "Выбрано",
        selectAll: "Выбрать все",
        deselectAll: "Снять все",
        filterByType: "Фильтр по типу",
        allTypes: "Все типы",
        search: "Поиск",
        searchPlaceholder: "Поиск по названию или серийному номеру",
        submit: "ДОБАВИТЬ В ПРИХОД"
      },
      delete: {
        confirm: "Вы уверены, что хотите удалить",
        product: "этот продукт",
        group: "эту группу",
        order: "этот приход"
      }
    },
    validation: {
      required: "обязательно",
      nameRequired: "Название обязательно",
      typeRequired: "Тип обязателен",
      specificationRequired: "Спецификация обязательна",
      serialNumberRequired: "Серийный номер обязателен",
      guaranteeStartRequired: "Дата начала гарантии обязательна",
      guaranteeEndRequired: "Дата окончания гарантии обязательна",
      priceUsdRequired: "Цена в USD должна быть больше 0",
      priceUahRequired: "Цена в UAH должна быть больше 0",
      guaranteeEndAfterStart: "Дата окончания гарантии должна быть позже даты начала",
      guaranteeTooLong: "Период гарантии не может превышать 10 лет",
      serialNumberExists: "Продукт с таким серийным номером уже существует",
      selectAtLeastOne: "Выберите хотя бы один продукт",
      groupNameRequired: "Название группы обязательно",
      descriptionRequired: "Описание обязательно"
    },
    productTypes: {
      Monitors: "Мониторы",
      Keyboards: "Клавиатуры",
      Mice: "Мыши",
      Processors: "Процессоры",
      "Graphics Cards": "Видеокарты",
      Motherboards: "Материнские платы",
      RAM: "Оперативная память",
      Storage: "Накопители",
      "Power Supplies": "Блоки питания",
      Cases: "Корпуса",
      Cooling: "Охлаждение",
      Audio: "Аудио"
    }
  },
  en: {
    common: {
      search: "Search",
      cancel: "CANCEL",
      delete: "DELETE",
      add: "ADD",
      create: "CREATE",
      save: "SAVE",
      edit: "EDIT",
      close: "CLOSE",
      loading: "Loading...",
      error: "Error",
      success: "Success",
      confirm: "Confirm",
      yes: "Yes",
      no: "No",
      new: "New",
      used: "Used",
      free: "Free",
      inRepair: "In Repair",
      active: "Active",
      inactive: "Inactive",
      available: "Available",
      unavailable: "Unavailable",
      reserved: "Reserved",
      sold: "Sold",
      damaged: "Damaged",
      maintenance: "Under Maintenance",
      testing: "Testing",
      shipped: "Shipped",
      delivered: "Delivered",
      returned: "Returned",
      pending: "Pending",
      processing: "Processing",
      completed: "Completed",
      cancelled: "Cancelled",
      draft: "Draft",
      published: "Published",
      archived: "Archived",
      comingSoon: "Feature will be added in future versions",
      underDevelopment: "Under Development",
      notImplemented: "Not Implemented",
      placeholder: "Placeholder"
    },
    navigation: {
      inventory: "INVENTORY",
      orders: "ORDERS",
      groups: "GROUPS",
      products: "PRODUCTS",
      users: "USERS",
      settings: "SETTINGS"
    },
    header: {
      activeSessions: "active sessions",
      today: "Today",
      monday: "Monday",
      tuesday: "Tuesday",
      wednesday: "Wednesday",
      thursday: "Thursday",
      friday: "Friday",
      saturday: "Saturday",
      sunday: "Sunday"
    },
    months: {
      january: "Jan",
      february: "Feb",
      march: "Mar",
      april: "Apr",
      may: "May",
      june: "Jun",
      july: "Jul",
      august: "Aug",
      september: "Sep",
      october: "Oct",
      november: "Nov",
      december: "Dec"
    },
    orders: {
      title: "Orders",
      addNew: "Create New Product",
      addExisting: "Add Existing",
      productsCount: "Products",
      total: "Total",
      deleteConfirm: "Are you sure you want to delete this order?",
      noSelection: "Select an order"
    },
    products: {
      title: "Products",
      addNew: "Add Product",
      type: "Type",
      specification: "Specification",
      allTypes: "All",
      allSpecs: "All",
      status: "Status",
      guarantee: "Guarantee",
      condition: "Condition",
      price: "Price",
      group: "Group",
      order: "Order",
      orderDate: "Order Date",
      actions: "Actions",
      from: "from",
      to: "to",
      deleteConfirm: "Are you sure you want to delete this product?"
    },
    groups: {
      title: "Groups",
      addNew: "Create Group",
      productsCount: "Products",
      description: "Description",
      deleteConfirm: "Are you sure you want to delete this group?",
      noSelection: "Select a group"
    },
    modals: {
      addProduct: {
        title: "Add Product",
        productName: "Product Name",
        productType: "Product Type",
        specification: "Specification",
        serialNumber: "Serial Number",
        guaranteeStart: "Guarantee Start Date",
        guaranteeEnd: "Guarantee End Date",
        priceUsd: "Price in USD",
        priceUah: "Price in UAH",
        order: "Order",
        condition: "Condition",
        selectType: "Select Type",
        enterSpecification: "Enter specification",
        enterSerialNumber: "Enter serial number",
        enterProductName: "Enter product name",
        submit: "ADD PRODUCT"
      },
      addGroup: {
        title: "Create Group",
        groupName: "Group Name",
        description: "Description",
        selectProducts: "Select Products",
        availableProducts: "Available Products",
        selected: "Selected",
        selectAll: "Select All",
        deselectAll: "Deselect All",
        filterByType: "Filter by Type",
        allTypes: "All Types",
        search: "Search",
        searchPlaceholder: "Search by name or serial number",
        noProducts: "No products found",
        submit: "CREATE GROUP"
      },
      addExistingProduct: {
        title: "Add Existing Product to Order",
        addingToOrder: "Adding to order",
        currentProductsCount: "Current products count",
        availableProducts: "Available Products",
        noProductsAvailable: "No products available for adding",
        allProductsAdded: "All products are already added to this order",
        selected: "Selected",
        selectAll: "Select All",
        deselectAll: "Deselect All",
        filterByType: "Filter by Type",
        allTypes: "All Types",
        search: "Search",
        searchPlaceholder: "Search by name or serial number",
        submit: "ADD TO ORDER"
      },
      delete: {
        confirm: "Are you sure you want to delete",
        product: "this product",
        group: "this group",
        order: "this order"
      }
    },
    validation: {
      required: "required",
      nameRequired: "Name is required",
      typeRequired: "Type is required",
      specificationRequired: "Specification is required",
      serialNumberRequired: "Serial number is required",
      guaranteeStartRequired: "Guarantee start date is required",
      guaranteeEndRequired: "Guarantee end date is required",
      priceUsdRequired: "USD price must be greater than 0",
      priceUahRequired: "UAH price must be greater than 0",
      guaranteeEndAfterStart: "Guarantee end date must be later than start date",
      guaranteeTooLong: "Guarantee period cannot exceed 10 years",
      serialNumberExists: "Product with this serial number already exists",
      selectAtLeastOne: "Select at least one product",
      groupNameRequired: "Group name is required",
      descriptionRequired: "Description is required"
    },
    productTypes: {
      Monitors: "Monitors",
      Keyboards: "Keyboards",
      Mice: "Mice",
      Processors: "Processors",
      "Graphics Cards": "Graphics Cards",
      Motherboards: "Motherboards",
      RAM: "RAM",
      Storage: "Storage",
      "Power Supplies": "Power Supplies",
      Cases: "Cases",
      Cooling: "Cooling",
      Audio: "Audio"
    }
  }
}

export const LocaleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState<string>('ru')

  useEffect(() => {
    
    const savedLocale = localStorage.getItem('locale')
    if (savedLocale && (savedLocale === 'ru' || savedLocale === 'en')) {
      setLocale(savedLocale)
    }
  }, [])

  const handleSetLocale = (newLocale: string) => {
    setLocale(newLocale)
    localStorage.setItem('locale', newLocale)
  }

  const t = (key: string): string => {
    const keys = key.split('.')
    let value: any = translations[locale as keyof typeof translations]
    
    for (const k of keys) {
      value = value?.[k]
    }
    
    return value || key
  }

  return (
    <LocaleContext.Provider value={{ locale, setLocale: handleSetLocale, t }}>
      {children}
    </LocaleContext.Provider>
  )
}

export const useTranslations = () => {
  const context = useContext(LocaleContext)
  if (context === undefined) {
    throw new Error('useTranslations must be used within a LocaleProvider')
  }
  return context
}
