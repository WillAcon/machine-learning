import { initConfusion } from './confusion';
import { initConvolution } from './conv';
import { initGradientDescent } from './gd';
import { initKMeans } from './kmeans';
import { initLinearRegression } from './linear';
import { initNeuralNetwork } from './neural';
import { initOverfit } from './overfit';
import { initPCA } from './pca';
import { initTree } from './tree';

let initialized = false;

export function initSimulators(root: ParentNode = document) {
  if (!initialized) initialized = true;
  initGradientDescent(root);
  initOverfit(root);
  initLinearRegression(root);
  initTree(root);
  initKMeans(root);
  initPCA(root);
  initConfusion(root);
  initNeuralNetwork(root);
  initConvolution(root);
}
