
export const colorMap: { [key: string]: string } = {
  '#ff0000': 'Rouge',
  '#0000ff': 'Bleu',
  '#00ff00': 'Vert',
  '#ffff00': 'Jaune',
  '#000000': 'Noir',
  '#ffffff': 'Blanc',
  '#800080': 'Violet',
  '#ffc0cb': 'Rose',
  '#ffa500': 'Orange',
  '#a52a2a': 'Marron',
  '#808080': 'Gris',
  '#000080': 'Bleu marine',
  '#f5f5dc': 'Beige',
  '#ffd700': 'Or',
  '#c0c0c0': 'Argent',
};

export const normalizeHexColor = (color: string): string => {
  if (color.startsWith('#')) {
    return color.toLowerCase();
  }
  if (!/^[0-9A-Fa-f]{6}$/.test(color)) {
    return color.toLowerCase();
  }
  return `#${color.toLowerCase()}`;
};

export const getColorName = (color: string): string => {
  if (!color) return '';
  const normalizedColor = normalizeHexColor(color);
  if (colorMap[normalizedColor]) {
    return colorMap[normalizedColor];
  }
  if (normalizedColor.startsWith('#')) {
    return `Code hex: ${normalizedColor}`;
  }
  return color;
};

export const transformOrderForEdit = (order: any) => {
  return {
    isFreeShipping: order.isFreeShipping || false,
    needsExchange: order.needsExchange || false,
    product_to_collect: order.product_to_collect || "",
    customerFirstName: order.customer_first_name || "",
    customerLastName: order.customer_last_name || "",
    customerPhone: order.customerPhone || "",
    customerAddress: order.customerAddress || "",
    wilaya: order.wilaya || "",
    municipality: order.municipality || "",
    shippingType: order.shippingType || "home",
    deskId: order.deskId || "",
    status: order.status || "pending",
    items: order.items?.map((item) => ({
      id: item.id?.toString() || Date.now().toString(),
      name: item.name || "",
      quantity: Number(item.quantity) || 1,
      price: Number(item.price) || 0,
      color: item.color || "",
      size: item.size || "",
      image: item.image || "/robe.jpg",
    })) || [
      {
        id: Date.now().toString(),
        name: "Nouveau produit",
        quantity: 1,
        price: 0,
        color: "",
        size: "",
        image: "/robe.jpg",
      },
    ],
  };
};

export const calculateOrderTotal = (items: any[], shippingPrice: number, isFreeShipping: boolean = false) => {
  const subtotal = items.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );
  return subtotal + (isFreeShipping ? 0 : shippingPrice);
};

export const calculateSubtotal = (items: any[]) => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

export const getStatusOptions = () => [
  { value: "pending", label: "En attente de confirmation" },
  { value: "confirmed", label: "Confirmé" },
  { value: "cancelled", label: "Annulé" },
];

export const getShippingOptions = () => [
  { value: "home", label: "Livraison à domicile" },
  { value: "desk", label: "Retrait au bureau" },
];

export const formatWilayaOptions = (shippingData: any[]) => {
  return shippingData?.map((w) => ({
    id: w.id.toString(),
    key: w.id.toString(),
    value: w.id.toString(),
    label: w.name,
  })) || [];
};

export const formatMunicipalityOptions = (homeShipping: any[]) => {
  return homeShipping?.map((m) => ({
    value: m.name,
    label: m.name,
  })) || [];
};

export const formatDeskOptions = (desks: any[]) => {
  return desks.map((desk) => ({
    value: desk.id.toString(),
    label: `${desk.name} - ${desk.address}`,
  }));
};

export const findWilayaById = (shippingData: any[], wilayaId: string) => {
  return shippingData?.find((w) => w.id === Number(wilayaId));
};

export const findDeskById = (desks: any[], deskId: string) => {
  return desks.find((desk) => desk.id === Number(deskId));
};

export const calculateShippingPrice = (
  shippingType: string,
  selectedWilayaShipping: any,
  municipality: string,
  deskId: string,
  availableDesks: any[]
) => {
  if (shippingType === "home") {
    if (!selectedWilayaShipping || !municipality) return 0;
    const municipalityShipping = selectedWilayaShipping.home?.find(
      (item) => item.name === municipality
    );
    return municipalityShipping ? Number(municipalityShipping.price) : 0;
  } else if (shippingType === "desk") {
    if (!selectedWilayaShipping || !deskId) return 0;
    const selectedDesk = availableDesks.find(
      (desk) => desk.id === Number(deskId)
    );
    if (selectedDesk) {
      const deskShipping = selectedWilayaShipping.desk?.find(
        (item) => item.id === selectedDesk.commune_id
      );
      return deskShipping ? Number(deskShipping.price) : 0;
    }
  }
  return 0;
};
