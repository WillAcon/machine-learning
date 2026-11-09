export type QuizQuestion = {
  q: string;
  options: string[];
  correct: number;
  explain: string;
};

/**
 * Preguntas de cierre por módulo. El índice del arreglo coincide con el id
 * del módulo (0–11). Cada pregunta tiene una sola respuesta correcta.
 */
export const quizzes: Record<number, QuizQuestion[]> = {
  0: [
    {
      q: '¿Cuál es la relación correcta entre inteligencia artificial, Machine Learning y Deep Learning?',
      options: [
        'Son sinónimos: los tres describen el mismo conjunto de técnicas.',
        'La IA es el campo general; el ML es una subárea y el DL una subárea del ML.',
        'El Deep Learning contiene al Machine Learning, que contiene a la IA.',
        'El Machine Learning es el campo general y la IA una de sus aplicaciones.'
      ],
      correct: 1,
      explain:
        'La IA es el objetivo amplio de construir sistemas que realizan tareas inteligentes. El ML es una familia de métodos que aprenden de datos y el DL usa redes neuronales profundas dentro del ML.'
    },
    {
      q: 'En aprendizaje supervisado, el modelo recibe durante el entrenamiento…',
      options: [
        'Solo entradas sin etiquetas.',
        'Pares de entrada y salida esperada.',
        'Una función de recompensa que prueba por ensayo y error.',
        'Únicamente la estructura de los datos.'
      ],
      correct: 1,
      explain:
        'El aprendizaje supervisado dispone de ejemplos etiquetados $(x_i, y_i)$ y aprende una función que generalice a entradas nuevas.'
    },
    {
      q: 'Un modelo obtiene 99 % de exactitud en entrenamiento y 62 % en test. ¿Qué diagnóstico es más razonable?',
      options: [
        'Underfitting: el modelo es demasiado simple.',
        'Overfitting: memorizó el entrenamiento y no generaliza.',
        'Los datos de test están mal etiquetados necesariamente.',
        'El modelo necesita más épocas de entrenamiento.'
      ],
      correct: 1,
      explain:
        'La brecha grande entre rendimiento de entrenamiento y de test es la señal clásica de overfitting o alta varianza.'
    },
    {
      q: '¿Cuál de estas tareas es típicamente no supervisada?',
      options: [
        'Predecir el precio de una casa.',
        'Clasificar correos como spam o no spam.',
        'Agrupar clientes con comportamientos similares.',
        'Detectar si una radiografía muestra una fractura.'
      ],
      correct: 2,
      explain:
        'El clustering busca estructura en datos sin etiquetas. Las otras tareas requieren una salida conocida durante el entrenamiento.'
    }
  ],
  1: [
    {
      q: 'La derivada de $f(x)=x^3$ en $x=2$ es…',
      options: ['6', '8', '12', '3'],
      correct: 2,
      explain: '$f\'(x)=3x^2$, por lo que $f\'(2)=3\\cdot 4=12$. La derivada indica la pendiente instantánea.'
    },
    {
      q: 'Si $A$ es una matriz de $3\\times 2$ y $B$ una matriz de $2\\times 4$, el producto $AB$ tiene dimensiones…',
      options: ['$3\\times 4$', '$2\\times 2$', '$4\\times 3$', 'No está definido'],
      correct: 0,
      explain:
        'El producto exige que las columnas de $A$ coincidan con las filas de $B$ ($2=2$) y produce una matriz de $3\\times 4$.'
    },
    {
      q: 'En descenso de gradiente, la actualización $\\theta \\leftarrow \\theta - \\alpha \\nabla L(\\theta)$ busca…',
      options: [
        'Aumentar la pérdida para explorar el espacio.',
        'Moverse en la dirección de máximo crecimiento de la pérdida.',
        'Moverse en la dirección opuesta al gradiente para reducir la pérdida.',
        'Calcular la solución exacta en un solo paso.'
      ],
      correct: 2,
      explain:
        'El gradiente apunta hacia el mayor crecimiento; restarlo da la dirección de descenso. $\\alpha$ controla el tamaño del paso.'
    },
    {
      q: 'Si dos eventos $A$ y $B$ son independientes, entonces…',
      options: [
        '$P(A \\cap B)=P(A)+P(B)$',
        '$P(A \\mid B)=P(A)$',
        '$P(A \\cup B)=1$',
        '$P(A \\cap B)=0$'
      ],
      correct: 1,
      explain:
        'La independencia significa que conocer $B$ no cambia la probabilidad de $A$. Equivalentemente, $P(A\\cap B)=P(A)P(B)$.'
    }
  ],
  2: [
    {
      q: '¿Qué hace NumPy con `a + b` cuando `a.shape == (3, 1)` y `b.shape == (1, 4)`?',
      options: [
        'Lanza un error de dimensiones incompatible.',
        'Aplica broadcasting y produce una matriz de $3\\times 4$.',
        'Concatena ambos arreglos.',
        'Suma solo el primer elemento de cada arreglo.'
      ],
      correct: 1,
      explain:
        'Broadcasting expande dimensiones de tamaño 1. El resultado combina las filas de `a` con las columnas de `b` en una matriz $3\\times 4$.'
    },
    {
      q: 'En Pandas, `df.groupby("ciudad")["ventas"].mean()` devuelve…',
      options: [
        'La media de ventas para cada ciudad.',
        'La suma total de ventas.',
        'Las filas duplicadas por ciudad.',
        'El número de columnas del DataFrame.'
      ],
      correct: 0,
      explain:
        '`groupby` separa las filas por la clave indicada y la agregación `mean()` calcula la media de ventas dentro de cada grupo.'
    },
    {
      q: '¿Por qué se separa un conjunto de test antes de explorar y ajustar el modelo?',
      options: [
        'Para que el entrenamiento sea más rápido.',
        'Para tener datos con los que estimar el rendimiento en ejemplos no vistos.',
        'Porque Scikit-learn lo exige obligatoriamente.',
        'Para reducir el número de features.'
      ],
      correct: 1,
      explain:
        'El conjunto de test simula datos futuros. Si se usa para elegir el modelo, deja de ser una estimación honesta de generalización.'
    },
    {
      q: '¿Cuál es la forma correcta de escalar features antes de comparar modelos con validación cruzada?',
      options: [
        'Escalar todo el dataset y luego hacer la partición.',
        'Escalar dentro de cada fold, ajustando el escalador solo con el fold de entrenamiento.',
        'No escalar nunca.',
        'Escalar solo la variable objetivo.'
      ],
      correct: 1,
      explain:
        'Ajustar el escalador con todo el dataset filtra información del fold de validación (data leakage). Debe ajustarse solo con entrenamiento, por ejemplo dentro de un `Pipeline`.'
    }
  ],
  3: [
    {
      q: 'El error de un modelo puede descomponerse en…',
      options: [
        'Sesgo, varianza y ruido irreducible.',
        'Precisión, recall y F1.',
        'Entrenamiento, validación y test.',
        'Features, etiquetas y pesos.'
      ],
      correct: 0,
      explain:
        'La descomposición sesgo-varianza separa el error sistemático del modelo, su sensibilidad a la muestra y el ruido inherente a los datos.'
    },
    {
      q: 'Un modelo con alta varianza normalmente…',
      options: [
        'Es demasiado simple y falla también en entrenamiento.',
        'Se ajusta muy bien al entrenamiento pero cambia mucho con otra muestra.',
        'Tiene siempre mejor rendimiento en test.',
        'No depende de los datos.'
      ],
      correct: 1,
      explain:
        'La alta varianza significa que el modelo es muy sensible a fluctuaciones de la muestra: memoriza y generaliza mal.'
    },
    {
      q: '¿Qué hace la regularización L2 sobre los pesos?',
      options: [
        'Los elimina todos.',
        'Penaliza su magnitud y los encoge hacia cero, sin volverlos exactamente cero.',
        'Aumenta la complejidad del modelo.',
        'Solo afecta al intercepto.'
      ],
      correct: 1,
      explain:
        'L2 añade $\\lambda\\|w\\|_2^2$ a la pérdida. Reduce la magnitud de los pesos y suaviza el modelo; L1 puede llevar pesos exactamente a cero.'
    },
    {
      q: 'La validación cruzada de $k$ folds sirve principalmente para…',
      options: [
        'Aumentar artificialmente el tamaño del dataset.',
        'Obtener una estimación más estable del rendimiento y reducir la dependencia de una sola partición.',
        'Eliminar la necesidad de un conjunto de test.',
        'Entrenar el modelo final con más datos que el dataset completo.'
      ],
      correct: 1,
      explain:
        'Al rotar el fold de validación, cada ejemplo se usa para validar una vez. El promedio es más robusto que una única división, aunque no sustituye al test final.'
    }
  ],
  4: [
    {
      q: 'En una regresión lineal simple, el método de mínimos cuadrados elige los parámetros que…',
      options: [
        'Maximizan la suma de los residuos.',
        'Minimizan la suma de los residuos al cuadrado.',
        'Minimizan el número de features.',
        'Igualan la media de $x$ y la media de $y$.'
      ],
      correct: 1,
      explain:
        'La pérdida cuadrática $\\sum (y_i-\\hat y_i)^2$ penaliza con más fuerza los errores grandes y tiene una solución cerrada.'
    },
    {
      q: 'La regresión logística es adecuada para clasificación binaria porque…',
      options: [
        'Produce una salida continua sin restricciones.',
        'Aplica la función sigmoide a una combinación lineal y devuelve una probabilidad.',
        'Solo funciona con variables categóricas.',
        'Minimiza directamente el error cuadrático medio.'
      ],
      correct: 1,
      explain:
        'El modelo calcula $\\sigma(w^Tx+b)\\in(0,1)$ e interpreta esa salida como probabilidad de la clase positiva; se entrena minimizando la entropía cruzada.'
    },
    {
      q: 'En un árbol de decisión, la impureza de Gini mide…',
      options: [
        'La profundidad máxima del árbol.',
        'La probabilidad de clasificar mal un ejemplo elegido al azar según la distribución de clases del nodo.',
        'El número de hojas del árbol.',
        'La correlación entre features.'
      ],
      correct: 1,
      explain:
        'Gini es $1-\\sum p_k^2$. Es cero cuando el nodo es puro y aumenta cuando las clases están mezcladas.'
    },
    {
      q: '¿Qué modelo es más apropiado si necesitas interpretar directamente el efecto de cada variable?',
      options: [
        'Una red neuronal profunda de 10 capas.',
        'Una regresión lineal o logística con coeficientes.',
        'Un Random Forest de 500 árboles sin análisis adicional.',
        'K-Means con 20 clusters.'
      ],
      correct: 1,
      explain:
        'Los coeficientes de un modelo lineal indican el cambio esperado en la salida por unidad de cada feature, manteniendo las demás constantes.'
    }
  ],
  5: [
    {
      q: 'K-Means minimiza…',
      options: [
        'La distancia entre clusters.',
        'La suma de distancias al cuadrado de cada punto a su centroide asignado.',
        'El número de clusters.',
        'La varianza total de las etiquetas.'
      ],
      correct: 1,
      explain:
        'Su objetivo es la inercia: $\\sum_k\\sum_{x\\in C_k}\\|x-\\mu_k\\|^2$. Alterna asignación y actualización de centroides hasta converger.'
    },
    {
      q: 'Antes de aplicar K-Means conviene…',
      options: [
        'Estandarizar las variables para que las escalas no dominen la distancia.',
        'Eliminar la media de la variable objetivo.',
        'Aumentar la dimensionalidad con polinomios.',
        'Usar siempre 10 clusters.'
      ],
      correct: 0,
      explain:
        'K-Means usa distancia euclidiana. Una variable con rango mucho mayor domina la asignación, por lo que se recomienda estandarizar.'
    },
    {
      q: 'El primer componente principal de PCA es…',
      options: [
        'La dirección de menor varianza.',
        'La dirección de máxima varianza en los datos centrados.',
        'El vector de etiquetas.',
        'La media de todas las variables.'
      ],
      correct: 1,
      explain:
        'PCA busca componentes ortogonales que maximizan la varianza proyectada. El primero captura la mayor cantidad de variabilidad.'
    },
    {
      q: 'DBSCAN se diferencia de K-Means en que…',
      options: [
        'Requiere especificar el número exacto de clusters.',
        'Puede encontrar clusters de forma arbitraria y marcar puntos como ruido.',
        'Solo funciona con datos de dos dimensiones.',
        'Siempre produce clusters esféricos.'
      ],
      correct: 1,
      explain:
        'DBSCAN agrupa por densidad: conecta puntos con suficientes vecinos. Detecta formas no convexas y etiqueta como ruido los puntos aislados.'
    }
  ],
  6: [
    {
      q: 'En un problema de detección de fraude, ¿qué métrica suele ser más informativa que la exactitud?',
      options: [
        'Exactitud, porque mide el porcentaje total de aciertos.',
        'Recall o sensibilidad, porque interesa no dejar pasar fraudes.',
        'MAE, porque el fraude es continuo.',
        'R², porque explica la varianza.'
      ],
      correct: 1,
      explain:
        'Con clases muy desbalanceadas, un modelo que predice siempre «no fraude» puede tener 99 % de exactitud y ser inútil. El recall mide cuántos positivos reales se detectan.'
    },
    {
      q: 'La precisión se define como…',
      options: [
        '$TP/(TP+FP)$',
        '$TP/(TP+FN)$',
        '$(TP+TN)/N$',
        '$2\\cdot TP/(2\\cdot TP+FP+FN)$'
      ],
      correct: 0,
      explain:
        'Precisión = verdaderos positivos entre todos los predichos como positivos. Responde: de lo que marqué positivo, ¿cuánto lo era?'
    },
    {
      q: 'Un AUC-ROC de 0.5 indica que el modelo…',
      options: [
        'Clasifica perfectamente.',
        'No discrimina mejor que el azar.',
        'Tiene 50 % de precisión exactamente.',
        'Invierte siempre las clases.'
      ],
      correct: 1,
      explain:
        'AUC mide la probabilidad de ordenar un positivo por encima de un negativo. 0.5 equivale a ordenar al azar; 1.0 es discriminación perfecta.'
    },
    {
      q: '¿Cuál es el propósito de separar validación y test?',
      options: [
        'Validación se usa para elegir hiperparámetros; test para la estimación final no sesgada.',
        'Ambos se usan para entrenar.',
        'Test se usa para ajustar el modelo y validación para reportar.',
        'No hay diferencia práctica.'
      ],
      correct: 0,
      explain:
        'Si se optimiza sobre test, la estimación deja de ser independiente. Validación guía las decisiones; test se reserva para el reporte final.'
    }
  ],
  7: [
    {
      q: 'Una función de activación introduce no linealidad porque…',
      options: [
        'Reduce el número de parámetros.',
        'Aplica una transformación no lineal entre capas, permitiendo representar funciones no lineales.',
        'Convierte todos los pesos en positivos.',
        'Elimina el sesgo.'
      ],
      correct: 1,
      explain:
        'Sin activaciones no lineales, cualquier composición de capas equivale a una transformación lineal. ReLU, sigmoide o tanh rompen esa linealidad.'
    },
    {
      q: 'Backpropagation calcula…',
      options: [
        'Los gradientes de la pérdida respecto a los parámetros usando la regla de la cadena.',
        'El número óptimo de capas.',
        'Los datos de entrenamiento.',
        'La matriz de confusión.'
      ],
      correct: 0,
      explain:
        'Backpropagation propaga el error desde la salida hacia atrás aplicando la regla de la cadena, y así obtiene $\\partial L/\\partial \\theta$ para cada parámetro.'
    },
    {
      q: 'En una CNN, una capa convolucional…',
      options: [
        'Conecta cada neurona con todas las de la capa anterior.',
        'Aplica filtros compartidos sobre ventanas locales para detectar patrones espaciales.',
        'Ordena los píxeles por intensidad.',
        'Solo funciona con imágenes en blanco y negro.'
      ],
      correct: 1,
      explain:
        'Los filtros comparten pesos en todas las posiciones, lo que reduce parámetros y produce mapas de activación sensibles a patrones locales.'
    },
    {
      q: 'El dropout durante el entrenamiento…',
      options: [
        'Elimina datos de entrenamiento permanentemente.',
        'Desactiva neuronas al azar para regularizar y reducir overfitting.',
        'Aumenta la tasa de aprendizaje.',
        'Solo se usa en la capa de salida.'
      ],
      correct: 1,
      explain:
        'Dropout impide que las neuronas dependan demasiado unas de otras. En inferencia se desactiva y se compensa la escala.'
    }
  ],
  8: [
    {
      q: 'La tokenización en NLP consiste en…',
      options: [
        'Traducir el texto a otro idioma.',
        'Dividir el texto en unidades (palabras, subpalabras o caracteres) procesables.',
        'Eliminar todas las palabras vacías.',
        'Convertir cada palabra en un número entero único.'
      ],
      correct: 1,
      explain:
        'Tokenizar segmenta el texto en piezas. La elección del tokenizador afecta el vocabulario, la longitud y la calidad del modelo.'
    },
    {
      q: 'TF-IDF asigna un peso alto a un término cuando…',
      options: [
        'Aparece mucho en un documento y en pocos documentos del corpus.',
        'Aparece poco en el documento y en todos los documentos.',
        'Es una stopword frecuente.',
        'El documento es muy largo.'
      ],
      correct: 0,
      explain:
        'TF mide frecuencia local; IDF penaliza términos comunes en todo el corpus. Un término frecuente en un documento pero raro globalmente es discriminativo.'
    },
    {
      q: 'Un embedding de palabras representa cada palabra como…',
      options: [
        'Un índice entero sin relación entre palabras.',
        'Un vector denso aprendido donde palabras con contextos similares quedan cerca.',
        'Una tabla de conteos.',
        'Una regla gramatical.'
      ],
      correct: 1,
      explain:
        'Los embeddings aprenden vectores continuos a partir de contexto. La proximidad geométrica captura similitud semántica.'
    },
    {
      q: 'La atención en un Transformer permite…',
      options: [
        'Procesar solo palabras consecutivas.',
        'Ponderar la relevancia de cada token respecto a los demás al construir una representación.',
        'Eliminar la necesidad de datos.',
        'Traducir sin entrenamiento.'
      ],
      correct: 1,
      explain:
        'La self-attention calcula pesos entre pares de tokens y agrega información contextual de forma dinámica, sin depender solo de la distancia secuencial.'
    }
  ],
  9: [
    {
      q: 'Una convolución 2D con un kernel de $3\\times 3$ sobre una imagen produce…',
      options: [
        'Una imagen del mismo tamaño exacto siempre.',
        'Un mapa de activación que responde a patrones locales capturados por el kernel.',
        'Una copia de la imagen original.',
        'Una reducción del número de canales a uno siempre.'
      ],
      correct: 1,
      explain:
        'El kernel se desliza por la imagen y calcula productos punto locales. El resultado resalta bordes, texturas u otros patrones según sus pesos.'
    },
    {
      q: 'El max pooling se usa principalmente para…',
      options: [
        'Aumentar la resolución de la imagen.',
        'Reducir la dimensión espacial conservando la activación más fuerte.',
        'Aumentar el número de canales.',
        'Aplicar color a la imagen.'
      ],
      correct: 1,
      explain:
        'Max pooling resume regiones locales con el valor máximo, reduce cómputo y aporta cierta invariancia a pequeños desplazamientos.'
    },
    {
      q: 'En detección de objetos, además de clasificar, el modelo debe…',
      options: [
        'Generar texto descriptivo.',
        'Localizar cada objeto con una caja delimitadora.',
        'Segmentar cada píxel obligatoriamente.',
        'Reconstruir la imagen.'
      ],
      correct: 1,
      explain:
        'La detección devuelve clase y coordenadas de la caja (bounding box) para cada instancia. La segmentación además asigna una máscara por píxel.'
    },
    {
      q: 'Data augmentation en visión sirve para…',
      options: [
        'Sustituir el conjunto de test.',
        'Aumentar la variedad efectiva del entrenamiento con transformaciones válidas (recortes, giros, cambios de brillo).',
        'Eliminar el overfitting por completo.',
        'Reducir el número de clases.'
      ],
      correct: 1,
      explain:
        'Las transformaciones amplían la cobertura de variaciones realistas y actúan como regularización, pero no garantizan eliminar el overfitting.'
    }
  ],
  10: [
    {
      q: 'Serializar un modelo con `joblib` o `pickle` permite…',
      options: [
        'Entrenarlo más rápido en producción.',
        'Guardar el objeto entrenado para cargarlo y predecir sin reentrenar.',
        'Mejorar automáticamente su precisión.',
        'Convertir el modelo en una base de datos.'
      ],
      correct: 1,
      explain:
        'La serialización persiste parámetros y estructura del modelo. Al cargarlo se recupera el estado entrenado; no mejora el rendimiento por sí sola.'
    },
    {
      q: 'Un endpoint de inferencia debe validar la entrada porque…',
      options: [
        'Los modelos aceptan cualquier tipo sin errores.',
        'Entradas con formato, escala o valores faltantes distintos a los del entrenamiento producen predicciones inválidas.',
        'La validación aumenta la precisión del modelo.',
        'Solo sirve para reducir el costo de red.'
      ],
      correct: 1,
      explain:
        'El modelo asume el esquema y la distribución del entrenamiento. La validación de esquema evita fallos silenciosos y errores 500.'
    },
    {
      q: 'Data drift ocurre cuando…',
      options: [
        'Cambia la distribución de los datos de entrada respecto a la del entrenamiento.',
        'El servidor se queda sin memoria.',
        'Se reduce el número de parámetros.',
        'El modelo se guarda en otro formato.'
      ],
      correct: 0,
      explain:
        'El drift es un cambio en $P(X)$. Puede degradar las predicciones aunque la relación $P(Y|X)$ no haya cambiado. Se monitorea con estadísticas de features.'
    },
    {
      q: 'Versionar datos, código y modelo es importante porque…',
      options: [
        'Permite reproducir experimentos y auditar qué modelo produjo cada predicción.',
        'Hace que el modelo entrene sin datos.',
        'Elimina la necesidad de monitoreo.',
        'Reduce automáticamente el sesgo.'
      ],
      correct: 0,
      explain:
        'La reproducibilidad exige registrar la misma combinación de datos, código, hiperparámetros y entorno. Sin versionado no se puede explicar ni revertir un cambio.'
    }
  ],
  11: [
    {
      q: 'Antes de modelar, el análisis exploratorio de datos (EDA) sirve para…',
      options: [
        'Elegir el algoritmo definitivo sin experimentar.',
        'Detectar valores faltantes, outliers, desbalance y relaciones relevantes.',
        'Aumentar el tamaño del dataset.',
        'Evitar la necesidad de validación.'
      ],
      correct: 1,
      explain:
        'El EDA informa decisiones de limpieza, transformación y modelado. También revela problemas que invalidarían un entrenamiento apresurado.'
    },
    {
      q: 'Un pipeline de Scikit-learn ayuda a evitar data leakage porque…',
      options: [
        'Aplica todas las transformaciones dentro de cada partición de entrenamiento.',
        'Elimina automáticamente las variables correlacionadas.',
        'Entrena con todo el dataset y valida con el mismo.',
        'No permite usar escaladores.'
      ],
      correct: 0,
      explain:
        'El pipeline encapsula preprocesamiento y modelo. En validación cruzada, cada transformación se ajusta solo con el fold de entrenamiento correspondiente.'
    },
    {
      q: 'Al comparar dos modelos, además de la métrica promedio debes reportar…',
      options: [
        'Solo el mejor resultado obtenido.',
        'La variabilidad entre folds o el intervalo de confianza.',
        'El número de líneas de código.',
        'El color de las gráficas.'
      ],
      correct: 1,
      explain:
        'Una diferencia pequeña puede deberse al azar de la partición. Reportar dispersión permite juzgar si la mejora es estable y relevante.'
    },
    {
      q: 'Un proyecto de ML bien documentado incluye, como mínimo…',
      options: [
        'Solo el notebook final con el mejor score.',
        'Objetivo, datos, supuestos, metodología, métricas, limitaciones y reproducibilidad.',
        'Únicamente el modelo serializado.',
        'Las capturas de pantalla del entrenamiento.'
      ],
      correct: 1,
      explain:
        'La documentación permite evaluar validez, reproducir resultados y entender limitaciones. Un score sin contexto no es evidencia suficiente.'
    }
  ]
};

export const totalQuizQuestions = Object.values(quizzes).reduce((acc, q) => acc + q.length, 0);
