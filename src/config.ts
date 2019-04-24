const namespace = '@MLIA';
const stroage = localStorage.getItem(namespace);
const config = stroage ? JSON.parse(stroage) : {
  autorun: false,
  nonstop: false,
  correctness: 0.8,
};

export function getAllOptions() {
  return config;
}

export function saveOptions() {
  localStorage.setItem(namespace, JSON.stringify(config));
}

export function getOption(key: string) {
  return config[key];
}

export function setOption(key: string, value: any) {
  config[key] = value;

  saveOptions();
}
