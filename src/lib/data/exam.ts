export type ExamQuestion = {
  moduleId: number;
  topic: string;
  q: string;
  options: string[];
  correct: number;
  explain: string;
};

export const examQuestions: ExamQuestion[] = [
  {
    moduleId: 0,
    topic: 'Fundamentos de IA',
    q: 'La diferencia central entre programación tradicional y Machine Learning es que en ML…',
    options: [
      'no se usan computadoras.',
      'las reglas se aprenden a partir de datos en lugar de escribirse explícitamente.',
      'siempre se necesitan redes neuronales.',
      'no existe evaluación del resultado.'
    ],
    correct: 1,
    explain:
      'En programación clásica el humano escribe las reglas; en ML el sistema ajusta parámetros a partir de ejemplos para inducir un comportamiento.'
  },
  {
    moduleId: 0,
    topic: 'Tipos de aprendizaje',
    q: 'La detección de fraude con ejemplos históricos etiquetados es un problema de…',
    options: ['aprendizaje por refuerzo', 'clustering', 'clasificación supervisada', 'reducción de dimensionalidad'],
    correct: 2,
    explain:
      'Hay una etiqueta binaria (fraude/no fraude) y ejemplos históricos, por lo que es clasificación supervisada. Si no hubiera etiquetas, sería detección de anomalías no supervisada.'
  },
  {
    moduleId: 1,
    topic: 'Cálculo',
    q: 'El gradiente de $f(x,y)=x^2+3xy$ en el punto $(1,2)$ es…',
    options: ['$(2,3)$', '$(8,3)$', '$(2,6)$', '$(8,6)$'],
    correct: 1,
    explain:
      '$\\partial f/\\partial x=2x+3y=2+6=8$ y $\\partial f/\\partial y=3x=3$. El gradiente es $(8,3)$.'
  },
  {
    moduleId: 1,
    topic: 'Álgebra lineal',
    q: 'En PCA, los autovectores de la matriz de covarianza indican…',
    options: [
      'las clases del problema.',
      'las direcciones de los componentes principales.',
      'los valores de la variable objetivo.',
      'el número óptimo de clusters.'
    ],
    correct: 1,
    explain:
      'Los autovectores definen direcciones ortogonales de varianza; los autovalores indican cuánta varianza explica cada dirección.'
  },
  {
    moduleId: 1,
    topic: 'Probabilidad',
    q: 'Si $P(A)=0.3$, $P(B)=0.5$ y $A$, $B$ son independientes, entonces $P(A\\cap B)$ es…',
    options: ['0.8', '0.15', '0.2', '0'],
    correct: 1,
    explain: 'Para eventos independientes, $P(A\\cap B)=P(A)P(B)=0.3\\cdot 0.5=0.15$.'
  },
  {
    moduleId: 2,
    topic: 'NumPy',
    q: '¿Qué devuelve `np.array([1,2,3]).reshape(3,1) * np.array([10,20])`?',
    options: [
      'Un error de dimensiones.',
      'Una matriz $3\\times 2$ con productos por broadcasting.',
      'Un vector de longitud 3.',
      'La concatenación de ambos arreglos.'
    ],
    correct: 1,
    explain:
      'El arreglo $(3,1)$ y el $(1,2)$ se expanden por broadcasting a $(3,2)$, multiplicando cada fila por cada columna.'
  },
  {
    moduleId: 2,
    topic: 'Pandas',
    q: 'Para imputar valores faltantes numéricos con la mediana dentro de un pipeline, lo correcto es…',
    options: [
      'usar `fillna(0)` siempre.',
      'usar `SimpleImputer(strategy="median")` ajustado solo con entrenamiento.',
      'eliminar todas las filas con cualquier nulo.',
      'ignorar los nulos porque el modelo los maneja.'
    ],
    correct: 1,
    explain:
      'La mediana debe calcularse solo con el fold de entrenamiento para no filtrar información. El imputer dentro del pipeline garantiza esa separación.'
  },
  {
    moduleId: 3,
    topic: 'Generalización',
    q: 'Añadir más datos de entrenamiento suele reducir principalmente…',
    options: ['el sesgo', 'la varianza', 'el ruido irreducible', 'el número de features'],
    correct: 1,
    explain:
      'Con más datos, la estimación de los parámetros es más estable y el modelo varía menos entre muestras. El sesgo y el ruido irreducible no se eliminan así.'
  },
  {
    moduleId: 3,
    topic: 'Regularización',
    q: 'Si aumentas demasiado $\\lambda$ en Ridge, el modelo tiende a…',
    options: [
      'sobreajustar más.',
      'acercar los pesos a cero y aumentar el sesgo.',
      'aumentar la varianza.',
      'ignorar la pérdida de entrenamiento.'
    ],
    correct: 1,
    explain:
      'Una penalización L2 muy fuerte encoge los pesos hacia cero. El modelo se vuelve más rígido: reduce varianza pero puede aumentar el sesgo (underfitting).'
  },
  {
    moduleId: 4,
    topic: 'Regresión',
    q: 'En una regresión lineal múltiple, un coeficiente de 3.5 para una feature significa que…',
    options: [
      'la salida siempre vale 3.5.',
      'manteniendo las demás variables constantes, un aumento de una unidad en esa feature se asocia a un aumento de 3.5 en la salida esperada.',
      'la feature explica el 3.5 % de la varianza.',
      'el modelo tiene 3.5 grados de libertad.'
    ],
    correct: 1,
    explain:
      'La interpretación es condicional: ceteris paribus, el cambio esperado en la salida por unidad de esa feature es el coeficiente.'
  },
  {
    moduleId: 4,
    topic: 'Clasificación',
    q: 'Un clasificador predice probabilidad 0.9 para la clase positiva. Si el umbral se fija en 0.95, el punto se clasifica como…',
    options: ['positivo', 'negativo', 'indeterminado', 'error'],
    correct: 1,
    explain:
      'El umbral decide la clase: solo se predice positivo si la probabilidad supera 0.95. Con 0.9 se asigna la clase negativa. Ajustar el umbral cambia precisión y recall.'
  },
  {
    moduleId: 4,
    topic: 'Árboles',
    q: 'Un árbol de decisión sin límite de profundidad entrenado con datos ruidosos probablemente…',
    options: [
      'tendrá alto sesgo y bajo overfitting.',
      'memorizará el entrenamiento y tendrá alta varianza.',
      'no podrá clasificar.',
      'será equivalente a una regresión lineal.'
    ],
    correct: 1,
    explain:
      'Sin poda, el árbol crece hasta hojas puras. Ajusta el ruido del entrenamiento y pierde generalización: alta varianza.'
  },
  {
    moduleId: 4,
    topic: 'Ensembles',
    q: 'Random Forest reduce la varianza respecto a un solo árbol porque…',
    options: [
      'usa un árbol más profundo.',
      'promedia muchos árboles entrenados con muestras y features aleatorias.',
      'elimina la necesidad de validación.',
      'convierte el problema en regresión.'
    ],
    correct: 1,
    explain:
      'El bagging y la selección aleatoria de features decorrelacionan los árboles; el promedio reduce la varianza sin aumentar mucho el sesgo.'
  },
  {
    moduleId: 5,
    topic: 'K-Means',
    q: 'Si K-Means se ejecuta con k igual al número de puntos, la inercia será…',
    options: ['máxima', 'cero', 'negativa', 'igual a la varianza total'],
    correct: 1,
    explain:
      'Cada punto es su propio centroide, por lo que la distancia al centroide asignado es cero y la inercia también. Ese modelo no generaliza ni descubre estructura.'
  },
  {
    moduleId: 5,
    topic: 'PCA',
    q: 'Conservar los dos primeros componentes de un dataset de 10 dimensiones sirve para…',
    options: [
      'aumentar la información disponible.',
      'reducir dimensionalidad conservando la mayor varianza posible en un subespacio.',
      'etiquetar los datos.',
      'eliminar el ruido de forma garantizada.'
    ],
    correct: 1,
    explain:
      'PCA proyecta en el subespacio de mayor varianza. Puede facilitar visualización y compresión, aunque no garantiza eliminar todo el ruido.'
  },
  {
    moduleId: 5,
    topic: 'DBSCAN',
    q: 'Un punto que no pertenece a ningún cluster denso en DBSCAN se etiqueta como…',
    options: ['centroide', 'ruido', 'outlier supervisado', 'componente principal'],
    correct: 1,
    explain:
      'DBSCAN distingue puntos núcleo, alcanzables y ruido. Los que no cumplen la densidad mínima quedan como ruido (−1).'
  },
  {
    moduleId: 6,
    topic: 'Métricas',
    q: 'Con 100 positivos y 9900 negativos, un modelo que predice siempre negativo tiene exactitud…',
    options: ['50 %', '99 %', '0 %', '100 %'],
    correct: 1,
    explain:
      'Acierta los 9900 negativos y falla los 100 positivos: 9900/10000 = 99 %. Por eso la exactitud sola es engañosa con desbalance.'
  },
  {
    moduleId: 6,
    topic: 'Precisión y recall',
    q: 'Si aumentas el umbral de decisión de un clasificador binario, generalmente…',
    options: [
      'aumentan precisión y recall.',
      'aumenta la precisión y disminuye el recall.',
      'disminuyen ambos.',
      'no cambia nada.'
    ],
    correct: 1,
    explain:
      'Un umbral más alto exige más confianza para predecir positivo: se reducen los falsos positivos (sube precisión) pero se escapan más positivos (baja recall).'
  },
  {
    moduleId: 6,
    topic: 'Validación',
    q: 'Elegir hiperparámetros con el conjunto de test…',
    options: [
      'es la práctica recomendada.',
      'invalida la estimación final porque el test deja de ser independiente.',
      'reduce el overfitting.',
      'es obligatorio en Scikit-learn.'
    ],
    correct: 1,
    explain:
      'Si el test guía decisiones, se filtra información y la métrica se vuelve optimista. Se usa validación para elegir y test solo para el reporte final.'
  },
  {
    moduleId: 7,
    topic: 'Redes neuronales',
    q: 'Sin funciones de activación no lineales, una red de varias capas equivale a…',
    options: [
      'una red más profunda.',
      'una única transformación lineal.',
      'un árbol de decisión.',
      'un algoritmo de clustering.'
    ],
    correct: 1,
    explain:
      'La composición de transformaciones lineales es otra transformación lineal. La no linealidad es lo que permite representar funciones complejas.'
  },
  {
    moduleId: 7,
    topic: 'Entrenamiento',
    q: 'Una tasa de aprendizaje demasiado alta puede provocar…',
    options: [
      'convergencia más lenta pero segura.',
      'oscilación o divergencia de la pérdida.',
      'sobreajuste instantáneo.',
      'que el modelo ignore los datos.'
    ],
    correct: 1,
    explain:
      'Pasos demasiado grandes pueden saltar el mínimo y hacer que la pérdida aumente. Se detecta porque la curva de entrenamiento no baja o explota.'
  },
  {
    moduleId: 7,
    topic: 'CNN',
    q: 'Compartir pesos en una capa convolucional reduce…',
    options: [
      'el número de datos.',
      'el número de parámetros y explota la estructura espacial.',
      'la necesidad de activaciones.',
      'el tamaño de la imagen.'
    ],
    correct: 1,
    explain:
      'El mismo filtro se aplica en todas las posiciones. Esto reduce parámetros y hace que la capa detecte un patrón independientemente de su ubicación.'
  },
  {
    moduleId: 8,
    topic: 'Representación de texto',
    q: 'Una limitación importante de la bolsa de palabras es que…',
    options: [
      'no puede usarse con clasificadores lineales.',
      'ignora el orden y el contexto de las palabras.',
      'requiere redes profundas.',
      'solo funciona en inglés.'
    ],
    correct: 1,
    explain:
      'La bolsa de palabras cuenta términos y pierde orden, negaciones y contexto. TF-IDF mejora la ponderación, pero sigue siendo una representación dispersa y local.'
  },
  {
    moduleId: 8,
    topic: 'Transformers',
    q: 'La self-attention calcula…',
    options: [
      'una convolución sobre píxeles.',
      'pesos de relevancia entre tokens para agregar contexto.',
      'un clustering de documentos.',
      'la tokenización del texto.'
    ],
    correct: 1,
    explain:
      'Cada token genera consultas, claves y valores; los pesos de atención indican cuánto contribuye cada token a la representación de otro.'
  },
  {
    moduleId: 9,
    topic: 'Convolución',
    q: 'Aplicar un kernel de detección de bordes a una imagen produce…',
    options: [
      'una imagen más pequeña sin información.',
      'un mapa que resalta cambios locales de intensidad.',
      'una etiqueta de clase.',
      'una copia exacta de la entrada.'
    ],
    correct: 1,
    explain:
      'Los kernels de borde responden a gradientes locales de intensidad; zonas uniformes producen valores bajos y los contornos valores altos.'
  },
  {
    moduleId: 9,
    topic: 'Tareas de visión',
    q: 'La diferencia entre detección y segmentación es que la segmentación…',
    options: [
      'solo usa cajas delimitadoras.',
      'asigna una etiqueta a nivel de píxel o instancia.',
      'no necesita entrenamiento.',
      'solo funciona en video.'
    ],
    correct: 1,
    explain:
      'La detección localiza con cajas; la segmentación produce una máscara que indica a qué clase o instancia pertenece cada píxel.'
  },
  {
    moduleId: 10,
    topic: 'Despliegue',
    q: 'Un modelo funciona en el notebook pero falla en producción. Una causa frecuente es…',
    options: [
      'que el modelo es demasiado interpretable.',
      'diferencias en el preprocesamiento, esquema o distribución de los datos.',
      'que se usó validación cruzada.',
      'que la pérdida era convexa.'
    ],
    correct: 1,
    explain:
      'El pipeline de producción debe replicar exactamente el preprocesamiento del entrenamiento y validar el esquema. Un desajuste produce predicciones inválidas o errores.'
  },
  {
    moduleId: 10,
    topic: 'Monitoreo',
    q: 'Monitorear solo la latencia del endpoint no detecta…',
    options: [
      'caídas del servidor.',
      'degradación silenciosa por data drift.',
      'errores 500.',
      'falta de memoria.'
    ],
    correct: 1,
    explain:
      'La latencia mide salud técnica, no calidad predictiva. El drift puede degradar las predicciones mientras la API responde rápido y sin errores.'
  },
  {
    moduleId: 11,
    topic: 'Metodología',
    q: 'En un proyecto de ML, dividir los datos antes de calcular estadísticas para imputar es importante porque…',
    options: [
      'acelera el entrenamiento.',
      'evita filtrar información del test al entrenamiento.',
      'reduce el número de features.',
      'garantiza mejor precisión.'
    ],
    correct: 1,
    explain:
      'Las estadísticas de imputación o escalado son parte del ajuste. Calcularlas con todo el dataset filtra información del test (data leakage).'
  },
  {
    moduleId: 11,
    topic: 'Comunicación de resultados',
    q: 'Reportar solo el mejor score de una búsqueda de hiperparámetros es insuficiente porque…',
    options: [
      'los scores no importan.',
      'no muestra variabilidad, coste ni comparación con una baseline.',
      'siempre está mal calculado.',
      'el test no debe usarse.'
    ],
    correct: 1,
    explain:
      'Un número aislado no permite saber si la mejora es estable o relevante. Hay que reportar baseline, dispersión, metodología y limitaciones.'
  }
];

export const examByModule = examQuestions.reduce<Record<number, ExamQuestion[]>>((acc, q) => {
  (acc[q.moduleId] ??= []).push(q);
  return acc;
}, {});
