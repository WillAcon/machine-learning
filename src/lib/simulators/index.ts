import { initConfusion } from './confusion';
import { initConvolution } from './conv';
import { initEM } from './em';
import { initGradientDescent } from './gd';
import { initKMeans } from './kmeans';
import { initLinearRegression } from './linear';
import { initMargin } from './margin';
import { initNeuralNetwork } from './neural';
import { initOverfit } from './overfit';
import { initPCA } from './pca';
import { initPerceptron } from './perceptron';
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
  initPerceptron(root);
  initMargin(root);
  initEM(root);
}
