<svelte:head>
  <title>Bibliografía y recursos · Curso Machine Learning</title>
  <meta name="description" content="Libros, cursos, documentación oficial, artículos y datasets públicos usados como referencia del curso." />
</svelte:head>

<div class="view active">
  <section class="module-hero" style="--mod-accent:var(--gold)">
    <div class="eyebrow">Referencias</div>
    <h1>Bibliografía y recursos</h1>
    <p class="lead">
      Este curso se apoya en materiales públicos, libros de referencia, documentación oficial y
      datasets abiertos. No se inventan resultados experimentales: los ejemplos del curso usan datos
      sintéticos o datasets públicos citados aquí.
    </p>
    <div class="module-hero-meta">
      <span class="chip accent">Libros y cursos</span>
      <span class="chip teal">Documentación oficial</span>
      <span class="chip gold">Datasets públicos</span>
      <span class="chip violet">Artículos clave</span>
    </div>
  </section>

  <section class="biblio-section">
    <h2>Libros de referencia</h2>
    <p>Textos que cubren el curso con distintos niveles de profundidad.</p>
    <ul class="ref-list">
      <li class="ref"><span class="tag">ML</span><div><b>James, Witten, Hastie &amp; Tibshirani — An Introduction to Statistical Learning</b> <a href="https://www.statlearning.com/" target="_blank" rel="noopener">statlearning.com</a><span class="why">Introducción aplicada con ejemplos en R/Python. Ideal para acompañar los módulos 3–6.</span></div></li>
      <li class="ref"><span class="tag">ML</span><div><b>Hastie, Tibshirani &amp; Friedman — The Elements of Statistical Learning</b> <a href="https://hastie.su.domains/ElemStatLearn/" target="_blank" rel="noopener">hastie.su.domains/ElemStatLearn</a><span class="why">Referencia matemática más profunda sobre modelos supervisados y regularización.</span></div></li>
      <li class="ref"><span class="tag">DL</span><div><b>Goodfellow, Bengio &amp; Courville — Deep Learning</b> <a href="https://www.deeplearningbook.org/" target="_blank" rel="noopener">deeplearningbook.org</a><span class="why">Fundamentos teóricos de redes neuronales, optimización y arquitecturas.</span></div></li>
      <li class="ref"><span class="tag">DL</span><div><b>Zhang et al. — Dive into Deep Learning</b> <a href="https://d2l.ai/" target="_blank" rel="noopener">d2l.ai</a><span class="why">Libro interactivo con notebooks ejecutables de PyTorch, TensorFlow y JAX.</span></div></li>
      <li class="ref"><span class="tag">Práctica</span><div><b>Géron — Hands-On Machine Learning with Scikit-Learn, Keras &amp; TensorFlow</b> <a href="https://github.com/ageron/handson-ml3" target="_blank" rel="noopener">github.com/ageron/handson-ml3</a><span class="why">Proyectos completos y código mantenido. Excelente para los módulos 4–11.</span></div></li>
      <li class="ref"><span class="tag">Math</span><div><b>Deisenroth, Faisal &amp; Ong — Mathematics for Machine Learning</b> <a href="https://mml-book.github.io/" target="_blank" rel="noopener">mml-book.github.io</a><span class="why">Álgebra lineal, cálculo, probabilidad y optimización orientados a ML.</span></div></li>
      <li class="ref"><span class="tag">Prob.</span><div><b>Murphy — Probabilistic Machine Learning: An Introduction</b> <a href="https://probml.github.io/pml-book/" target="_blank" rel="noopener">probml.github.io/pml-book</a><span class="why">Enfoque probabilístico moderno, con código y capítulos abiertos.</span></div></li>
      <li class="ref"><span class="tag">Python</span><div><b>VanderPlas — Python Data Science Handbook</b> <a href="https://jakevdp.github.io/PythonDataScienceHandbook/" target="_blank" rel="noopener">jakevdp.github.io</a><span class="why">NumPy, Pandas, Matplotlib y Scikit-learn explicados con notebooks.</span></div></li>
    </ul>
  </section>

  <section class="biblio-section">
    <h2>Matemáticas</h2>
    <p>Recursos para construir la base del módulo 1.</p>
    <ul class="ref-list">
      <li class="ref"><span class="tag">Video</span><div><b>3Blue1Brown — Essence of Linear Algebra</b> <a href="https://www.3blue1brown.com/topics/linear-algebra" target="_blank" rel="noopener">3blue1brown.com</a><span class="why">Animaciones que construyen intuición geométrica de vectores, matrices y autovalores.</span></div></li>
      <li class="ref"><span class="tag">Video</span><div><b>3Blue1Brown — Essence of Calculus</b> <a href="https://www.3blue1brown.com/topics/calculus" target="_blank" rel="noopener">3blue1brown.com</a><span class="why">Derivadas, integrales y regla de la cadena desde la intuición.</span></div></li>
      <li class="ref"><span class="tag">Curso</span><div><b>Khan Academy — Linear Algebra, Calculus, Statistics</b> <a href="https://www.khanacademy.org/math" target="_blank" rel="noopener">khanacademy.org/math</a><span class="why">Ejercicios graduados y explicaciones paso a paso.</span></div></li>
      <li class="ref"><span class="tag">Curso</span><div><b>MIT 18.06 — Linear Algebra (Gilbert Strang)</b> <a href="https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/" target="_blank" rel="noopener">ocw.mit.edu</a><span class="why">Curso universitario completo con clases, problemas y exámenes.</span></div></li>
    </ul>
  </section>

  <section class="biblio-section">
    <h2>Python, datos y visualización</h2>
    <p>Documentación oficial que conviene tener a mano.</p>
    <ul class="ref-list">
      <li class="ref"><span class="tag">Docs</span><div><b>NumPy User Guide</b> <a href="https://numpy.org/doc/stable/user/" target="_blank" rel="noopener">numpy.org/doc/stable/user</a><span class="why">Broadcasting, indexado, álgebra lineal y rendimiento.</span></div></li>
      <li class="ref"><span class="tag">Docs</span><div><b>Pandas User Guide</b> <a href="https://pandas.pydata.org/docs/user_guide/" target="_blank" rel="noopener">pandas.pydata.org</a><span class="why">Selección, agrupación, unión y limpieza de datos tabulares.</span></div></li>
      <li class="ref"><span class="tag">Docs</span><div><b>Matplotlib — Tutorials</b> <a href="https://matplotlib.org/stable/tutorials/" target="_blank" rel="noopener">matplotlib.org</a><span class="why">Gráficos publication-quality y personalización de ejes.</span></div></li>
      <li class="ref"><span class="tag">Docs</span><div><b>Seaborn — User Guide</b> <a href="https://seaborn.pydata.org/tutorial.html" target="_blank" rel="noopener">seaborn.pydata.org</a><span class="why">Visualización estadística de distribuciones y relaciones.</span></div></li>
      <li class="ref"><span class="tag">Docs</span><div><b>Scikit-learn — User Guide</b> <a href="https://scikit-learn.org/stable/user_guide.html" target="_blank" rel="noopener">scikit-learn.org</a><span class="why">Referencia de algoritmos, pipelines, métricas y validación.</span></div></li>
      <li class="ref"><span class="tag">Curso</span><div><b>Kaggle Learn — Python, Pandas, Intro to ML</b> <a href="https://www.kaggle.com/learn" target="_blank" rel="noopener">kaggle.com/learn</a><span class="why">Microcursos con notebooks y ejercicios prácticos.</span></div></li>
    </ul>
  </section>

  <section class="biblio-section">
    <h2>Machine Learning clásico</h2>
    <p>Cursos y referencias para los módulos 3–6.</p>
    <ul class="ref-list">
      <li class="ref"><span class="tag">Curso</span><div><b>Stanford CS229 — Machine Learning</b> <a href="https://cs229.stanford.edu/" target="_blank" rel="noopener">cs229.stanford.edu</a><span class="why">Notas matemáticas, problem sets y conferencias de Andrew Ng.</span></div></li>
      <li class="ref"><span class="tag">Curso</span><div><b>Machine Learning Specialization (DeepLearning.AI)</b> <a href="https://www.coursera.org/specializations/machine-learning-introduction" target="_blank" rel="noopener">coursera.org</a><span class="why">Introducción guiada a regresión, clasificación y recomendación.</span></div></li>
      <li class="ref"><span class="tag">Práctica</span><div><b>Google — Rules of Machine Learning</b> <a href="https://developers.google.com/machine-learning/guides/rules-of-ml" target="_blank" rel="noopener">developers.google.com</a><span class="why">Buenas prácticas de proyectos reales, baselines y evaluación.</span></div></li>
      <li class="ref"><span class="tag">Paper</span><div><b>Breiman — Random Forests</b> <a href="https://link.springer.com/article/10.1023/A:1010933404324" target="_blank" rel="noopener">Springer Machine Learning 45</a><span class="why">Artículo original de bagging de árboles y estimación de error OOB.</span></div></li>
      <li class="ref"><span class="tag">Paper</span><div><b>Chen &amp; Guestrin — XGBoost</b> <a href="https://arxiv.org/abs/1603.02754" target="_blank" rel="noopener">arXiv:1603.02754</a><span class="why">Gradient boosting escalable con regularización y poda.</span></div></li>
    </ul>
  </section>

  <section class="biblio-section">
    <h2>Deep learning y visión</h2>
    <p>De la neurona artificial a las arquitecturas modernas.</p>
    <ul class="ref-list">
      <li class="ref"><span class="tag">Curso</span><div><b>Stanford CS231n — Convolutional Neural Networks for Visual Recognition</b> <a href="https://cs231n.stanford.edu/" target="_blank" rel="noopener">cs231n.stanford.edu</a><span class="why">Notas y asignaciones sobre CNN, optimización y visión.</span></div></li>
      <li class="ref"><span class="tag">Curso</span><div><b>fast.ai — Practical Deep Learning for Coders</b> <a href="https://course.fast.ai/" target="_blank" rel="noopener">course.fast.ai</a><span class="why">Enfoque top-down: modelos útiles desde la primera lección.</span></div></li>
      <li class="ref"><span class="tag">Docs</span><div><b>PyTorch — Tutorials</b> <a href="https://pytorch.org/tutorials/" target="_blank" rel="noopener">pytorch.org/tutorials</a><span class="why">Entrenamiento, transferencia de aprendizaje y despliegue.</span></div></li>
      <li class="ref"><span class="tag">Docs</span><div><b>TensorFlow — Tutorials</b> <a href="https://www.tensorflow.org/tutorials" target="_blank" rel="noopener">tensorflow.org/tutorials</a><span class="why">Keras, CNN, RNN y despliegue en producción.</span></div></li>
      <li class="ref"><span class="tag">Paper</span><div><b>He et al. — Deep Residual Learning (ResNet)</b> <a href="https://arxiv.org/abs/1512.03385" target="_blank" rel="noopener">arXiv:1512.03385</a><span class="why">Conexiones residuales que hicieron posible entrenar redes muy profundas.</span></div></li>
      <li class="ref"><span class="tag">Paper</span><div><b>Ronneberger et al. — U-Net</b> <a href="https://arxiv.org/abs/1505.04597" target="_blank" rel="noopener">arXiv:1505.04597</a><span class="why">Arquitectura encoder–decoder para segmentación semántica.</span></div></li>
      <li class="ref"><span class="tag">Paper</span><div><b>Redmon et al. — YOLO</b> <a href="https://arxiv.org/abs/1506.02640" target="_blank" rel="noopener">arXiv:1506.02640</a><span class="why">Detección de objetos en una sola pasada, base de muchas variantes modernas.</span></div></li>
    </ul>
  </section>

  <section class="biblio-section">
    <h2>NLP y modelos de lenguaje</h2>
    <p>Del conteo de palabras a los Transformers.</p>
    <ul class="ref-list">
      <li class="ref"><span class="tag">Libro</span><div><b>Jurafsky &amp; Martin — Speech and Language Processing</b> <a href="https://web.stanford.edu/~jurafsky/slp3/" target="_blank" rel="noopener">web.stanford.edu/~jurafsky/slp3</a><span class="why">Referencia completa de NLP, con capítulos actualizados sobre LLM.</span></div></li>
      <li class="ref"><span class="tag">Curso</span><div><b>Hugging Face — NLP Course</b> <a href="https://huggingface.co/learn/nlp-course" target="_blank" rel="noopener">huggingface.co/learn/nlp-course</a><span class="why">Transformers, fine-tuning, tokenización y despliegue con la librería oficial.</span></div></li>
      <li class="ref"><span class="tag">Docs</span><div><b>spaCy — Usage Guide</b> <a href="https://spacy.io/usage" target="_blank" rel="noopener">spacy.io/usage</a><span class="why">Pipelines lingüísticos, entidades y procesamiento en producción.</span></div></li>
      <li class="ref"><span class="tag">Paper</span><div><b>Vaswani et al. — Attention Is All You Need</b> <a href="https://arxiv.org/abs/1706.03762" target="_blank" rel="noopener">arXiv:1706.03762</a><span class="why">Artículo que introdujo la arquitectura Transformer.</span></div></li>
      <li class="ref"><span class="tag">Paper</span><div><b>Devlin et al. — BERT</b> <a href="https://arxiv.org/abs/1810.04805" target="_blank" rel="noopener">arXiv:1810.04805</a><span class="why">Preentrenamiento bidireccional con enmascaramiento y fine-tuning.</span></div></li>
      <li class="ref"><span class="tag">Paper</span><div><b>Mikolov et al. — Word2Vec</b> <a href="https://arxiv.org/abs/1301.3781" target="_blank" rel="noopener">arXiv:1301.3781</a><span class="why">Embeddings de palabras aprendidos con skip-gram y CBOW.</span></div></li>
    </ul>
  </section>

  <section class="biblio-section">
    <h2>MLOps y producción</h2>
    <p>Herramientas y guías para llevar modelos a producción.</p>
    <ul class="ref-list">
      <li class="ref"><span class="tag">Curso</span><div><b>DataTalksClub — MLOps Zoomcamp</b> <a href="https://github.com/DataTalksClub/mlops-zoomcamp" target="_blank" rel="noopener">github.com/DataTalksClub/mlops-zoomcamp</a><span class="why">Curso gratuito de experiment tracking, orquestación, despliegue y monitoreo.</span></div></li>
      <li class="ref"><span class="tag">Curso</span><div><b>Made With ML — MLOps Course</b> <a href="https://madewithml.com/" target="_blank" rel="noopener">madewithml.com</a><span class="why">Ciclo de vida completo con buenas prácticas de ingeniería.</span></div></li>
      <li class="ref"><span class="tag">Docs</span><div><b>FastAPI</b> <a href="https://fastapi.tiangolo.com/" target="_blank" rel="noopener">fastapi.tiangolo.com</a><span class="why">Framework para exponer modelos como API con validación Pydantic.</span></div></li>
      <li class="ref"><span class="tag">Docs</span><div><b>Docker — Get Started</b> <a href="https://docs.docker.com/get-started/" target="_blank" rel="noopener">docs.docker.com</a><span class="why">Contenedores reproducibles para entrenamiento e inferencia.</span></div></li>
      <li class="ref"><span class="tag">Docs</span><div><b>MLflow</b> <a href="https://mlflow.org/docs/latest/" target="_blank" rel="noopener">mlflow.org</a><span class="why">Tracking de experimentos, registro de modelos y despliegue.</span></div></li>
      <li class="ref"><span class="tag">Docs</span><div><b>Evidently AI</b> <a href="https://docs.evidentlyai.com/" target="_blank" rel="noopener">docs.evidentlyai.com</a><span class="why">Detección de drift y monitoreo de calidad de datos y modelos.</span></div></li>
      <li class="ref"><span class="tag">Paper</span><div><b>Sculley et al. — Hidden Technical Debt in Machine Learning Systems</b> <a href="https://papers.nips.cc/paper/5656-hidden-technical-debt-in-machine-learning-systems.pdf" target="_blank" rel="noopener">NeurIPS 2015</a><span class="why">Por qué el modelo es una pequeña parte de un sistema de ML real.</span></div></li>
    </ul>
  </section>

  <section class="biblio-section">
    <h2>Datasets públicos</h2>
    <p>Datos abiertos usados en ejercicios y proyectos. Verifica siempre la licencia antes de reutilizarlos.</p>
    <ul class="ref-list">
      <li class="ref"><span class="tag">Tabular</span><div><b>California Housing</b> <a href="https://scikit-learn.org/stable/datasets/real_world.html#california-housing-dataset" target="_blank" rel="noopener">scikit-learn.org</a><span class="why">Regresión de precios de vivienda con 8 features. Proyecto 1.</span></div></li>
      <li class="ref"><span class="tag">Texto</span><div><b>20 Newsgroups</b> <a href="https://scikit-learn.org/stable/datasets/real_world.html#the-20-newsgroups-text-dataset" target="_blank" rel="noopener">scikit-learn.org</a><span class="why">Clasificación de texto en 20 categorías. Proyecto 2.</span></div></li>
      <li class="ref"><span class="tag">Tabular</span><div><b>UCI Machine Learning Repository</b> <a href="https://archive.ics.uci.edu/" target="_blank" rel="noopener">archive.ics.uci.edu</a><span class="why">Colección histórica de datasets para clasificación y regresión.</span></div></li>
      <li class="ref"><span class="tag">Tabular</span><div><b>Online Retail (UCI)</b> <a href="https://archive.ics.uci.edu/dataset/352/online+retail" target="_blank" rel="noopener">archive.ics.uci.edu</a><span class="why">Transacciones de un minorista para segmentación RFM y clustering. Proyecto 3.</span></div></li>
      <li class="ref"><span class="tag">Texto</span><div><b>SMS Spam Collection (UCI)</b> <a href="https://archive.ics.uci.edu/dataset/228/sms+spam+collection" target="_blank" rel="noopener">archive.ics.uci.edu</a><span class="why">5 574 mensajes etiquetados para detección de spam. Proyecto 4.</span></div></li>
      <li class="ref"><span class="tag">Tabular</span><div><b>Telco Customer Churn (Kaggle)</b> <a href="https://www.kaggle.com/datasets/blastchar/telco-customer-churn" target="_blank" rel="noopener">kaggle.com</a><span class="why">Clientes de telecomunicaciones para predicción de abandono. Proyecto 5.</span></div></li>
      <li class="ref"><span class="tag">Tabular</span><div><b>Kaggle Datasets</b> <a href="https://www.kaggle.com/datasets" target="_blank" rel="noopener">kaggle.com/datasets</a><span class="why">Churn, crédito, vivienda y muchos otros con kernels de ejemplo.</span></div></li>
      <li class="ref"><span class="tag">Visión</span><div><b>Fashion-MNIST</b> <a href="https://github.com/zalandoresearch/fashion-mnist" target="_blank" rel="noopener">github.com/zalandoresearch/fashion-mnist</a><span class="why">28×28 imágenes de ropa; sustituto más difícil de MNIST.</span></div></li>
      <li class="ref"><span class="tag">Visión</span><div><b>CIFAR-10 / CIFAR-100</b> <a href="https://www.cs.toronto.edu/~kriz/cifar.html" target="_blank" rel="noopener">cs.toronto.edu/~kriz/cifar.html</a><span class="why">Imágenes naturales en color para CNN. Proyecto 6.</span></div></li>
      <li class="ref"><span class="tag">Visión</span><div><b>COCO</b> <a href="https://cocodataset.org/" target="_blank" rel="noopener">cocodataset.org</a><span class="why">Detección, segmentación y captioning a gran escala.</span></div></li>
      <li class="ref"><span class="tag">Texto</span><div><b>IMDB Movie Reviews</b> <a href="https://ai.stanford.edu/~amaas/data/sentiment/" target="_blank" rel="noopener">ai.stanford.edu/~amaas/data/sentiment</a><span class="why">50 000 reseñas etiquetadas para análisis de sentimiento. Proyecto 7.</span></div></li>
      <li class="ref"><span class="tag">Recsys</span><div><b>MovieLens 100K (GroupLens)</b> <a href="https://grouplens.org/datasets/movielens/100k/" target="_blank" rel="noopener">grouplens.org</a><span class="why">100 000 valoraciones de películas para filtrado colaborativo. Proyecto 8.</span></div></li>
      <li class="ref"><span class="tag">Anomalías</span><div><b>Credit Card Fraud Detection (ULB / UCI)</b> <a href="https://archive.ics.uci.edu/dataset/27/credit+card+fraud+detection" target="_blank" rel="noopener">archive.ics.uci.edu</a><span class="why">284 807 transacciones con 492 fraudes para detección de anomalías. Proyecto 9.</span></div></li>
      <li class="ref"><span class="tag">NLP</span><div><b>Hugging Face Datasets</b> <a href="https://huggingface.co/datasets" target="_blank" rel="noopener">huggingface.co/datasets</a><span class="why">Miles de datasets de texto, audio e imagen con carga directa.</span></div></li>
    </ul>
  </section>

  <section class="biblio-section">
    <h2>Cómo citar y verificar</h2>
    <p>
      Los resultados que aparecen en el curso son ejemplos ilustrativos calculados con datos
      sintéticos o con los datasets anteriores. No se presentan como benchmarks oficiales. Antes de
      comparar modelos, revisa la licencia del dataset, la partición usada y la métrica reportada en
      el artículo original.
    </p>
    <ul class="ref-list">
      <li class="ref"><span class="tag">Índice</span><div><b>Papers with Code</b> <a href="https://paperswithcode.com/" target="_blank" rel="noopener">paperswithcode.com</a><span class="why">Artículos con código y tablas de resultados por tarea.</span></div></li>
      <li class="ref"><span class="tag">Papers</span><div><b>arXiv — Machine Learning</b> <a href="https://arxiv.org/list/cs.LG/recent" target="_blank" rel="noopener">arxiv.org/list/cs.LG</a><span class="why">Preprints recientes; verifica si fueron revisados por pares.</span></div></li>
    </ul>
  </section>
</div>
