<h1 align="center">
dots.ocr: Multilingual Document Layout Parsing in a Single Vision-Language Model
</h1>


## Introduction

**dots.ocr** is a powerful, multilingual document parser that unifies layout detection and content recognition within a single vision-language model while maintaining good reading order. Despite its compact 1.7B-parameter LLM foundation, it achieves state-of-the-art(SOTA) performance.

1. **Powerful Performance:** **dots.ocr** achieves SOTA performance for text, tables, and reading order on [OmniDocBench](https://github.com/opendatalab/OmniDocBench), while delivering formula recognition results comparable to much larger models like Doubao-1.5 and gemini2.5-pro.
2. **Multilingual Support:** **dots.ocr** demonstrates robust parsing capabilities for low-resource languages, achieving decisive advantages across both layout detection and content recognition on our in-house multilingual documents benchmark.
3. **Unified and Simple Architecture:** By leveraging a single vision-language model, **dots.ocr** offers a significantly more streamlined architecture than conventional methods that rely on complex, multi-model pipelines. Switching between tasks is accomplished simply by altering the input prompt, proving that a VLM can achieve competitive detection results compared to traditional detection models like DocLayout-YOLO.
4.  **Efficient and Fast Performance:** Built upon a compact 1.7B LLM, **dots.ocr** provides faster inference speeds than many other high-performing models based on larger foundations.


### Performance Comparison on Document Parsing Benchmarks
<img src="https://raw.githubusercontent.com/rednote-hilab/dots.ocr/master/assets/chart.png" border="0" />

> **Notes:** 
> - The EN, ZH metrics are the end2end evaluation results of [OmniDocBench](https://github.com/opendatalab/OmniDocBench), and Multilingual metric is the end2end evaluation results of dots.ocr-bench.


## Show Case
### Example for formula document
<img src="https://raw.githubusercontent.com/rednote-hilab/dots.ocr/master/assets/showcase/formula1.png" alt="formula1.png" border="0" />
<img src="https://raw.githubusercontent.com/rednote-hilab/dots.ocr/master/assets/showcase/formula2.png" alt="formula2.png" border="0" />
<img src="https://raw.githubusercontent.com/rednote-hilab/dots.ocr/master/assets/showcase/formula3.png" alt="formula3.png" border="0" />

### Example for table document
<img src="https://raw.githubusercontent.com/rednote-hilab/dots.ocr/master/assets/showcase/table1.png" alt="table1.png" border="0" />
<img src="https://raw.githubusercontent.com/rednote-hilab/dots.ocr/master/assets/showcase/table2.png" alt="table2.png" border="0" />
<img src="https://raw.githubusercontent.com/rednote-hilab/dots.ocr/master/assets/showcase/table3.png" alt="table3.png" border="0" />

### Example for multilingual document
<img src="https://raw.githubusercontent.com/rednote-hilab/dots.ocr/master/assets/showcase/Tibetan.png" alt="Tibetan.png" border="0" />
<img src="https://raw.githubusercontent.com/rednote-hilab/dots.ocr/master/assets/showcase/tradition_zh.png" alt="tradition_zh.png" border="0" />
<img src="https://raw.githubusercontent.com/rednote-hilab/dots.ocr/master/assets/showcase/nl.png" alt="nl.png" border="0" />
<img src="https://raw.githubusercontent.com/rednote-hilab/dots.ocr/master/assets/showcase/kannada.png" alt="kannada.png" border="0" />
<img src="https://raw.githubusercontent.com/rednote-hilab/dots.ocr/master/assets/showcase/russian.png" alt="russian.png" border="0" />

### Example for reading order
<img src="https://raw.githubusercontent.com/rednote-hilab/dots.ocr/master/assets/showcase/reading_order.png" alt="reading_order.png" border="0" />

### Example for grounding ocr
<img src="https://raw.githubusercontent.com/rednote-hilab/dots.ocr/master/assets/showcase/grounding.png" alt="grounding.png" border="0" />



## Benchmark Results

### 1. OmniDocBench

#### The end-to-end evaluation results of different tasks.

<table>
<thead>
<tr>
<th rowspan="2"><strong>Model<br>Type</strong></th>
<th rowspan="2"><strong>Methods</strong></th>
<th colspan="2"><strong>Overall<sup>Edit</sup>↓</strong></th>
<th colspan="2"><strong>Text<sup>Edit</sup>↓</strong></th>
<th colspan="2"><strong>Formula<sup>Edit</sup>↓</strong></th>
<th colspan="2"><strong>Table<sup>TEDS</sup>↑</strong></th>
<th colspan="2"><strong>Table<sup>Edit</sup>↓</strong></th>
<th colspan="2"><strong>Read Order<sup>Edit</sup>↓</strong></th>
</tr>
<tr>
<th><em>EN</em></th>
<th><em>ZH</em></th>
<th><em>EN</em></th>
<th><em>ZH</em></th>
<th><em>EN</em></th>
<th><em>ZH</em></th>
<th><em>EN</em></th>
<th><em>ZH</em></th>
<th><em>EN</em></th>
<th><em>ZH</em></th>
<th><em>EN</em></th>
<th><em>ZH</em></th>
</tr>
</thead>
<tbody>
<tr>
<td rowspan="8"><strong>Pipeline<br>Tools</strong></td>
<td>MinerU</td>
<td>0.150</td>
<td>0.357</td>
<td>0.061</td>
<td>0.215</td>
<td>0.278</td>
<td>0.577</td>
<td>78.6</td>
<td>62.1</td>
<td>0.180</td>
<td>0.344</td>
<td>0.079</td>
<td>0.292</td>
</tr>
<tr>
<td>Marker</td>
<td>0.336</td>
<td>0.556</td>
<td>0.080</td>
<td>0.315</td>
<td>0.530</td>
<td>0.883</td>
<td>67.6</td>
<td>49.2</td>
<td>0.619</td>
<td>0.685</td>
<td>0.114</td>
<td>0.340</td>
</tr>
<tr>
<td>Mathpix</td>
<td>0.191</td>
<td>0.365</td>
<td>0.105</td>
<td>0.384</td>
<td>0.306</td>
<td>0.454</td>
<td>77.0</td>
<td>67.1</td>
<td>0.243</td>
<td>0.320</td>
<td>0.108</td>
<td>0.304</td>
</tr>
<tr>
<td>Docling</td>
<td>0.589</td>
<td>0.909</td>
<td>0.416</td>
<td>0.987</td>
<td>0.999</td>
<td>1</td>
<td>61.3</td>
<td>25.0</td>
<td>0.627</td>
<td>0.810</td>
<td>0.313</td>
<td>0.837</td>
</tr>
<tr>
<td>Pix2Text</td>
<td>0.320</td>
<td>0.528</td>
<td>0.138</td>
<td>0.356</td>
<td>0.276</td>
<td>0.611</td>
<td>73.6</td>
<td>66.2</td>
<td>0.584</td>
<td>0.645</td>
<td>0.281</td>
<td>0.499</td>
</tr>
<tr>
<td>Unstructured</td>
<td>0.586</td>
<td>0.716</td>
<td>0.198</td>
<td>0.481</td>
<td>0.999</td>
<td>1</td>
<td>0</td>
<td>0.06</td>
<td>1</td>
<td>0.998</td>
<td>0.145</td>
<td>0.387</td>
</tr>
<tr>
<td>OpenParse</td>
<td>0.646</td>
<td>0.814</td>
<td>0.681</td>
<td>0.974</td>
<td>0.996</td>
<td>1</td>
<td>64.8</td>
<td>27.5</td>
<td>0.284</td>
<td>0.639</td>
<td>0.595</td>
<td>0.641</td>
</tr>
<tr>
<td>PPStruct-V3</td>
<td>0.145</td>
<td>0.206</td>
<td>0.058</td>
<td>0.088</td>
<td>0.295</td>
<td>0.535</td>
<td>-</td>
<td>-</td>
<td>0.159</td>
<td>0.109</td>
<td>0.069</td>
<td>0.091</td>
</tr>
<tr>
<td rowspan="9"><strong>Expert<br>VLMs</strong></td>
<td>GOT-OCR</td>
<td>0.287</td>
<td>0.411</td>
<td>0.189</td>
<td>0.315</td>
<td>0.360</td>
<td>0.528</td>
<td>53.2</td>
<td>47.2</td>
<td>0.459</td>
<td>0.520</td>
<td>0.141</td>
<td>0.280</td>
</tr>
<tr>
<td>Nougat</td>
<td>0.452</td>
<td>0.973</td>
<td>0.365</td>
<td>0.998</td>
<td>0.488</td>
<td>0.941</td>
<td>39.9</td>
<td>0</td>
<td>0.572</td>
<td>1.000</td>
<td>0.382</td>
<td>0.954</td>
</tr>
<tr>
<td>Mistral OCR</td>
<td>0.268</td>
<td>0.439</td>
<td>0.072</td>
<td>0.325</td>
<td>0.318</td>
<td>0.495</td>
<td>75.8</td>
<td>63.6</td>
<td>0.600</td>
<td>0.650</td>
<td>0.083</td>
<td>0.284</td>
</tr>
<tr>
<td>OLMOCR-sglang</td>
<td>0.326</td>
<td>0.469</td>
<td>0.097</td>
<td>0.293</td>
<td>0.455</td>
<td>0.655</td>
<td>68.1</td>
<td>61.3</td>
<td>0.608</td>
<td>0.652</td>
<td>0.145</td>
<td>0.277</td>
</tr>
<tr>
<td>SmolDocling-256M</td>
<td>0.493</td>
<td>0.816</td>
<td>0.262</td>
<td>0.838</td>
<td>0.753</td>
<td>0.997</td>
<td>44.9</td>
<td>16.5</td>
<td>0.729</td>
<td>0.907</td>
<td>0.227</td>
<td>0.522</td>
</tr>
<tr>
<td>Dolphin</td>
<td>0.206</td>
<td>0.306</td>
<td>0.107</td>
<td>0.197</td>
<td>0.447</td>
<td>0.580</td>
<td>77.3</td>
<td>67.2</td>
<td>0.180</td>
<td>0.285</td>
<td>0.091</td>
<td>0.162</td>
</tr>
<tr>
<td>MinerU 2</td>
<td>0.139</td>
<td>0.240</td>
<td>0.047</td>
<td>0.109</td>
<td>0.297</td>
<td>0.536</td>
<td>82.5</td>
<td>79.0</td>
<td>0.141</td>
<td>0.195</td>
<td>0.069<</td>
<td>0.118</td>
</tr>
<tr>
<td>OCRFlux</td>
<td>0.195</td>
<td>0.281</td>
<td>0.064</td>
<td>0.183</td>
<td>0.379</td>
<td>0.613</td>
<td>71.6</td>
<td>81.3</td>
<td>0.253</td>
<td>0.139</td>
<td>0.086</td>
<td>0.187</td>
</tr>
<tr>
<td>MonkeyOCR-pro-3B</td>
<td>0.138</td>
<td>0.206</td>
<td>0.067</td>
<td>0.107</td>
<td><strong>0.246</strong></td>
<td>0.421</td>
<td>81.5</td>
<td>87.5</td>
<td>0.139</td>
<td>0.111</td>
<td>0.100</td>
<td>0.185</td>
</tr>
<tr>

<td rowspan="5"><strong>General<br>VLMs</strong></td>
<td>GPT4o</td>
<td>0.233</td>
<td>0.399</td>
<td>0.144</td>
<td>0.409</td>
<td>0.425</td>
<td>0.606</td>
<td>72.0</td>
<td>62.9</td>
<td>0.234</td>
<td>0.329</td>
<td>0.128</td>
<td>0.251</td>
</tr>
    <tr>
      <td>Qwen2-VL-72B</td>
      <td>0.252</td>
      <td>0.327</td>
      <td>0.096</td>
      <td>0.218</td>
      <td>0.404</td>
      <td>0.487</td>
      <td>76.8</td>
      <td>76.4</td>
      <td>0.387</td>
      <td>0.408</td>
      <td>0.119</td>
      <td>0.193</td>
    </tr>
    <tr>
      <td>Qwen2.5-VL-72B</td>
      <td>0.214</td>
      <td>0.261</td>
      <td>0.092</td>
      <td>0.18</td>
      <td>0.315</td>
      <td>0.434</td>
      <td>82.9</td>
      <td>83.9</td>
      <td>0.341</td>
      <td>0.262</td>
      <td>0.106</td>
      <td>0.168</td>
    </tr>
    <tr>
      <td>Gemini2.5-Pro</td>
      <td>0.148</td>
      <td>0.212</td>
      <td>0.055</td>
      <td>0.168</td>
      <td>0.356</td>
      <td>0.439</td>
      <td>85.8</td>
      <td>86.4</td>
      <td>0.13</td>
      <td>0.119</td>
      <td>0.049</td>
      <td>0.121</td>
    </tr>
    <tr>
      <td>doubao-1-5-thinking-vision-pro-250428</td>
      <td>0.140</td>
      <td>0.162</td>
      <td>0.043</td>
      <td>0.085</td>
      <td>0.295</td>
      <td><strong>0.384</strong></td>
      <td>83.3</td>
      <td><strong>89.3</strong></td>
      <td>0.165</td>
      <td><strong>0.085</strong></td>
      <td>0.058</td>
      <td>0.094</td>
    </tr>
<tr>
<td rowspan="1"><strong>Expert VLMs</strong></td>
<td><strong>dots.ocr</strong></td>
<td><strong>0.125</strong></td>
<td><strong>0.160</strong></td>
<td><strong>0.032</strong></td>
<td><strong>0.066</strong></td>
<td>0.329</td>
<td>0.416</td>
<td><strong>88.6</strong></td>
<td>89.0</td>
<td><strong>0.099</strong></td>
<td>0.092</td>
<td><strong>0.040</strong></td>
<td><strong>0.067</strong></td>
</tr>
<tr>
</tbody>
</table>


#### The end-to-end text recognition performance across 9 PDF page types.

<table>
<thead>
<tr>
<th><strong>Model<br>Type</strong></th>
<th><strong>Models</strong></th>
<th><strong>Book</strong></th>
<th><strong>Slides</strong></th>
<th><strong>Financial<br>Report</strong></th>
<th><strong>Textbook</strong></th>
<th><strong>Exam<br>Paper</strong></th>
<th><strong>Magazine</strong></th>
<th><strong>Academic<br>Papers</strong></th>
<th><strong>Notes</strong></th>
<th><strong>Newspaper</strong></th>
<th><strong>Overall</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td rowspan="3"><strong>Pipeline<br>Tools</strong></td>
<td>MinerU</td>
<td>0.055</td>
<td>0.124</td>
<td><u>0.033</u></td>
<td>0.102</td>
<td>0.159</td>
<td><strong>0.072</strong></td>
<td><u>0.025</u></td>
<td>0.984</td>
<td>0.171</td>
<td>0.206</td>
</tr>
<tr>
<td>Marker</td>
<td>0.074</td>
<td>0.340</td>
<td>0.089</td>
<td>0.319</td>
<td>0.452</td>
<td>0.153</td>
<td>0.059</td>
<td>0.651</td>
<td>0.192</td>
<td>0.274</td>
</tr>
<tr>
<td>Mathpix</td>
<td>0.131</td>
<td>0.220</td>
<td>0.202</td>
<td>0.216</td>
<td>0.278</td>
<td>0.147</td>
<td>0.091</td>
<td>0.634</td>
<td>0.690</td>
<td>0.300</td>
</tr>
<tr>
<td rowspan="5"><strong>Expert<br>VLMs</strong></td>
<td>GOT-OCR</td>
<td>0.111</td>
<td>0.222</td>
<td>0.067</td>
<td>0.132</td>
<td>0.204</td>
<td>0.198</td>
<td>0.179</td>
<td>0.388</td>
<td>0.771</td>
<td>0.267</td>
</tr>
<tr>
<td>Nougat</td>
<td>0.734</td>
<td>0.958</td>
<td>1.000</td>
<td>0.820</td>
<td>0.930</td>
<td>0.830</td>
<td>0.214</td>
<td>0.991</td>
<td>0.871</td>
<td>0.806</td>
</tr>
<tr>
<td>Dolphin</td>
<td>0.091</td>
<td>0.131</td>
<td>0.057</td>
<td>0.146</td>
<td>0.231</td>
<td>0.121</td>
<td>0.074</td>
<td>0.363</td>
<td>0.307</td>
<td>0.177</td>
</tr>
<tr>
<td>OCRFlux</td>
<td>0.068</td>
<td>0.125</td>
<td>0.092</td>
<td>0.102</td>
<td>0.119</td>
<td>0.083</td>
<td>0.047</td>
<td>0.223</td>
<td>0.536</td>
<td>0.149</td>
</tr>
<tr>
<td>MonkeyOCR-pro-3B</td>
<td>0.084</td>
<td>0.129</td>
<td>0.060</td>
<td>0.090</td>
<td>0.107</td>
<td>0.073</td>
<td>0.050</td>
<td>0.171</td>
<td>0.107</td>
<td>0.100</td>
</tr>
<tr>
<td rowspan="4"><strong>General<br>VLMs</strong></td>
<td>GPT4o</td>
<td>0.157</td>
<td>0.163</td>
<td>0.348</td>
<td>0.187</td>
<td>0.281</td>
<td>0.173</td>
<td>0.146</td>
<td>0.607</td>
<td>0.751</td>
<td>0.316</td>
</tr>
<tr>
<td>Qwen2.5-VL-7B</td>
<td>0.148</td>
<td>0.053</td>
<td>0.111</td>
<td>0.137</td>
<td>0.189</td>
<td>0.117</td>
<td>0.134</td>
<td>0.204</td>
<td>0.706</td>
<td>0.205</td>
</tr>
<tr>
<td>InternVL3-8B</td>
<td>0.163</td>
<td>0.056</td>
<td>0.107</td>
<td>0.109</td>
<td>0.129</td>
<td>0.100</td>
<td>0.159</td>
<td>0.150</td>
<td>0.681</td>
<td>0.188</td>
</tr>
<tr>
<td>doubao-1-5-thinking-vision-pro-250428</td>
<td>0.048</td>
<td>0.048</td>
<td>0.024</td>
<td><strong>0.062</strong></td>
<td>0.085</td>
<td>0.051</td>
<td>0.039</td>
<td><strong>0.096</strong></td>
<td>0.181</td>
<td>0.073</td>
</tr>
<tr>
<td rowspan="1"><strong>Expert VLMs</strong></td>
<td><strong>dots.ocr</strong></td>
<td><strong>0.031</strong></td>
<td><strong>0.047</strong></td>
<td><strong>0.011</strong></td>
<td>0.082</td>
<td><strong>0.079</strong></td>
<td><strong>0.028</strong></td>
<td><strong>0.029</strong></td>
<td>0.109</td>
<td><strong>0.056</strong></td>
<td><strong>0.055</strong></td>
</tr>

</tbody>
</table>

> **Notes:** 
> - The metrics are from [MonkeyOCR](https://github.com/Yuliang-Liu/MonkeyOCR), [OmniDocBench](https://github.com/opendatalab/OmniDocBench), and our own internal evaluations.
> - We delete the Page-header and Page-footer cells in the result markdown.
> - We use tikz_preprocess pipeline to upsample the images to dpi 200.


### 2. **dots.ocr-bench**

This is an inhouse benchmark which contain 1493 pdf images with 100 languages.

#### The end-to-end evaluation results of different tasks.

<table>
<thead>
<tr>
<th rowspan="1"><strong>Methods</strong></th>
<th colspan="1"><strong>Overall<sup>Edit</sup>↓</strong></th>
<th colspan="1"><strong>Text<sup>Edit</sup>↓</strong></th>
<th colspan="1"><strong>Formula<sup>Edit</sup>↓</strong></th>
<th colspan="1"><strong>Table<sup>TEDS</sup>↑</strong></th>
<th colspan="1"><strong>Table<sup>Edit</sup>↓</strong></th>
<th colspan="1"><strong>Read Order<sup>Edit</sup>↓</strong></th>
</tr>
</thead>
<tbody>
<td>MonkeyOCR-3B</td>
<td>0.483</td>
<td>0.445</td>
<td>0.627</td>
<td>50.93</td>
<td>0.452</td>
<td>0.409</td>
</tr>
<tr>
<td>doubao-1-5-thinking-vision-pro-250428</td>
<td>0.291</td>
<td>0.226</td>
<td>0.440</td>
<td>71.2</td>
<td>0.260</td>
<td>0.238</td>
</tr>
<tr>
<td>doubao-1-6</td>
<td>0.299</td>
<td>0.270</td>
<td>0.417</td>
<td>71.0</td>
<td>0.258</td>
<td>0.253</td>
</tr>
<tr>
<td>Gemini2.5-Pro</td>
<td>0.251</td>
<td>0.163</td>
<td>0.402</td>
<td>77.1</td>
<td>0.236</td>
<td>0.202</td>
</tr>
<tr>
<td><strong>dots.ocr</strong> </td>
<td><strong>0.177</strong></td>
<td><strong>0.075</strong></td>
<td><strong>0.297</strong></td>
<td><strong>79.2</strong></td>
<td><strong>0.186</strong></td>
<td><strong>0.152</strong></td>
</tr>

</tbody>
</table>

> **Notes:** 
> - We use the same metric calculation pipeline of [OmniDocBench](https://github.com/opendatalab/OmniDocBench).
> - We delete the Page-header and Page-footer cells in the result markdown.

#### Layout Detection

<table>
<thead>
<tr>
<th rowspan="2"><strong>Method</strong></th>
<th colspan="5" style="text-align: center;"><strong>F1@IoU=.50:.05:.95↑</strong></th>
<th colspan="5" style="text-align: center;"><strong>F1@IoU=.50↑</strong></th>
</tr>
<tr>
<th>Overall</th>
<th>Text</th>
<th>Formula</th>
<th>Table</th>
<th>Picture</th>
<th>Overall</th>
<th>Text</th>
<th>Formula</th>
<th>Table</th>
<th>Picture</th>
</tr>
</thead>

<tbody>
<td>DocLayout-YOLO-DocStructBench</td>
<td>0.733</td>
<td>0.694</td>
<td>0.480</td>
<td>0.803</td>
<td>0.619</td>
<td>0.806</td>
<td>0.779</td>
<td>0.620</td>
<td>0.858</td>
<td>0.678</td>
</tr>

<tr>
<td>dots.ocr-parse all</td>
<td>0.831</td>
<td>0.801</td>
<td>0.654</td>
<td>0.838</td>
<td>0.748</td>
<td>0.922</td>
<td>0.909</td>
<td>0.770</td>
<td>0.888</td>
<td>0.831</td>
</tr>

<tr>
<td> <strong>dots.ocr-detection only</strong> </td>
<td><strong>0.845</strong></td>
<td><strong>0.816</strong></td>
<td><strong>0.716</strong></td>
<td><strong>0.875</strong></td>
<td><strong>0.765</strong></td>
<td><strong>0.930</strong></td>
<td><strong>0.917</strong></td>
<td><strong>0.832</strong></td>
<td><strong>0.918</strong></td>
<td><strong>0.843</strong></td>
</tr>

</tbody>
</table>

> **Notes:**  
> - prompt_layout_all_en for **parse all**, prompt_layout_only_en for **detection only**, please refer to [prompts](https://github.com/rednote-hilab/dots.ocr/blob/master/dots_ocr/utils/prompts.py)


### 3. olmOCR-bench.

<table>
<thead>
<tr>
<th>Model</th>
<th>ArXiv</th>
<th>Old Scans<br>Math</th>
<th>Tables</th>
<th>Old Scans</th>
<th>Headers and<br>Footers</th>
<th>Multi<br>column</th>
<th>Long Tiny<br>Text</th>
<th>Base</th>
<th>Overall</th>
</tr>
</thead>
<tbody>
<tr>
<td>GOT OCR</td>
<td>52.7</td>
<td>52.0</td>
<td>0.2</td>
<td>22.1</td>
<td>93.6</td>
<td>42.0</td>
<td>29.9</td>
<td>94.0</td>
<td>48.3 ± 1.1</td>
</tr>
<tr>
<td>Marker</td>
<td>76.0</td>
<td>57.9</td>
<td>57.6</td>
<td>27.8</td>
<td>84.9</td>
<td>72.9</td>
<td>84.6</td>
<td>99.1</td>
<td>70.1 ± 1.1</td>
</tr>
<tr>
<td>MinerU</td>
<td>75.4</td>
<td>47.4</td>
<td>60.9</td>
<td>17.3</td>
<td><strong>96.6</strong></td>
<td>59.0</td>
<td>39.1</td>
<td>96.6</td>
<td>61.5 ± 1.1</td>
</tr>
<tr>
<td>Mistral OCR</td>
<td>77.2</td>
<td>67.5</td>
<td>60.6</td>
<td>29.3</td>
<td>93.6</td>
<td>71.3</td>
<td>77.1</td>
<td>99.4</td>
<td>72.0 ± 1.1</td>
</tr>
<tr>
<td>Nanonets OCR</td>
<td>67.0</td>
<td>68.6</td>
<td><strong>77.7</strong></td>
<td>39.5</td>
<td>40.7</td>
<td>69.9</td>
<td>53.4</td>
<td>99.3</td>
<td>64.5 ± 1.1</td>
</tr>
<tr>
<td>GPT-4o<br>(No Anchor)</td>
<td>51.5</td>
<td><strong>75.5</strong></td>
<td>69.1</td>
<td>40.9</td>
<td>94.2</td>
<td>68.9</td>
<td>54.1</td>
<td>96.7</td>
<td>68.9 ± 1.1</td>
</tr>
<tr>
<td>GPT-4o<br>(Anchored)</td>
<td>53.5</td>
<td>74.5</td>
<td>70.0</td>
<td>40.7</td>
<td>93.8</td>
<td>69.3</td>
<td>60.6</td>
<td>96.8</td>
<td>69.9 ± 1.1</td>
</tr>
<tr>
<td>Gemini Flash 2<br>(No Anchor)</td>
<td>32.1</td>
<td>56.3</td>
<td>61.4</td>
<td>27.8</td>
<td>48.0</td>
<td>58.7</td>
<td><strong>84.4</strong></td>
<td>94.0</td>
<td>57.8 ± 1.1</td>
</tr>
<tr>
<td>Gemini Flash 2<br>(Anchored)</td>
<td>54.5</td>
<td>56.1</td>
<td>72.1</td>
<td>34.2</td>
<td>64.7</td>
<td>61.5</td>
<td>71.5</td>
<td>95.6</td>
<td>63.8 ± 1.2</td>
</tr>
<tr>
<td>Qwen 2 VL<br>(No Anchor)</td>
<td>19.7</td>
<td>31.7</td>
<td>24.2</td>
<td>17.1</td>
<td>88.9</td>
<td>8.3</td>
<td>6.8</td>
<td>55.5</td>
<td>31.5 ± 0.9</td>
</tr>
<tr>
<td>Qwen 2.5 VL<br>(No Anchor)</td>
<td>63.1</td>
<td>65.7</td>
<td>67.3</td>
<td>38.6</td>
<td>73.6</td>
<td>68.3</td>
<td>49.1</td>
<td>98.3</td>
<td>65.5 ± 1.2</td>
</tr>
<tr>
<td>olmOCR v0.1.75<br>(No Anchor)</td>
<td>71.5</td>
<td>71.4</td>
<td>71.4</td>
<td><strong>42.8</strong></td>
<td>94.1</td>
<td>77.7</td>
<td>71.0</td>
<td>97.8</td>
<td>74.7 ± 1.1</td>
</tr>
<tr>
<td>olmOCR v0.1.75<br>(Anchored)</td>
<td>74.9</td>
<td>71.2</td>
<td>71.0</td>
<td>42.2</td>
<td>94.5</td>
<td>78.3</td>
<td>73.3</td>
<td>98.3</td>
<td>75.5 ± 1.0</td>
</tr>
<tr>
<td>MonkeyOCR-pro-3B</td>
<td><strong>83.8</strong></td>
<td>68.8</td>
<td>74.6</td>
<td>36.1</td>
<td>91.2</td>
<td>76.6</td>
<td>80.1</td>
<td>95.3</td>
<td>75.8 ± 1.0</td>
</tr>
<tr>
<td><strong>dots.ocr</strong></td>
<td>82.1</td>
<td>64.2</td>
<td><strong>88.3</strong></td>
<td>40.9</td>
<td>94.1</td>
<td><strong>82.4</strong></td>
<td>81.2</td>
<td><strong>99.5</strong></td>
<td><strong>79.1 ± 1.0</strong></td>
</tr>
</tbody>
</table>


> **Note:**
> - The metrics are from [MonkeyOCR](https://github.com/Yuliang-Liu/MonkeyOCR), 
[olmocr](https://github.com/allenai/olmocr), and our own internal evaluations.
> - We delete the Page-header and Page-footer cells in the result markdown.

## Methods

### Pretrain

We developed a foundational Vision-Language Model (VLM) through a three-stage training process:

*   **Stage1: Vision Encoder Pre-training**
    We trained a 1.2-billion-parameter Vision Encoder (VE) from scratch on a vast and comprehensive dataset of image-text pairs.
*   **Stage2: VE Continued Pre-training**
    We incorporated additional visual data, including OCR, video, grounding data, etc. Leveraging the `NaViT` architecture, our model supports high-resolution inputs of up to 11 million pixels. The VE was then aligned with the `Qwen2.5-1.5B` language model and trained on this diverse visual data with LLM frozen, which resulted in our general vision encoder `dots.vit`.
*   **Stage3: VLM Specialization for OCR**
    We then used a pure OCR dataset for training. To improve training efficiency, we first trained on a certain volume of tokens with the VE parameters frozen. Subsequently, we unfroze all parameters and continued training on an additional one-fifth of that token volume, which produced our foundational OCR model, `dots.ocr.base`.

### SFT

The SFT stage was implemented on the following key strategies:

*   **Diverse SFT Dataset:** We constructed a dataset of nearly 300,000 samples, integrating our in-house manual annotations, synthetic data (tables, formulas, multilingual OCR), as well as open-source datasets.
*   **Iterative Data Flywheel:** We employed a feedback loop to build an inhouse multilingual structured layout data with 15k samples. This process, repeated over three iterations, involved:
    *   Sampling "bad cases" based on model performance.
    *   Manually annotating these cases.
    *   Adding them back into the training set.
*   **Reading Order:** We corrected the sequence of all layout element boxes to establish the correct reading order. This was primarily done using larger models for sorting, supplemented by rule-based post-processing methods. We found that with sufficient data diversity and quality, training the model on a list of elements sorted in their natural reading order yields excellent results.
*   **Quality and Robustness:** We build a multi-expert system for data cleaning and distillation, and applied data augmentation (resizing, rotation, noise) to improve model robustness.
*   **Multitask training:** We leveraged a single source of structured layout data to generate the SFT data with a variety of prompts. This approach enables the model to perform different tasks, such as detection and recognition, based on the specific prompt provided.

The resulting `dots.ocr` model demonstrates performance on par with models possessing significantly more parameters.


## Limitation & Future Work

- **Complex Document Elements:**
  - **Table&Formula**: dots.ocr is not yet perfect for high-complexity tables and formula extraction.
  - **Picture**: Pictures in documents are currently not parsed.

- **Parsing Failures:** The model may fail to parse under certain conditions:
  - When the character-to-pixel ratio is excessively high. Try enlarging the image or increasing the PDF parsing DPI (a setting of 200 is recommended). However, please note that the model performs optimally on images with a resolution under 11289600 pixels.
  - Continuous special characters, such as ellipses (`...`) and underscores (`_`), may cause the prediction output to repeat endlessly. In such scenarios, consider using alternative prompts like `prompt_layout_only_en`, `prompt_ocr`, or `prompt_grounding_ocr` ([details here](https://github.com/rednote-hilab/dots.ocr/blob/master/dots_ocr/utils/prompts.py)).
    
- **Performance Bottleneck:** Despite its 1.7B parameter LLM foundation, **dots.ocr** is not yet optimized for high-throughput processing of large PDF volumes. 

We are committed to achieving more accurate table and formula parsing, as well as enhancing the model's OCR capabilities for broader generalization, all while aiming for **a more powerful, more efficient model**. Furthermore, we are actively considering the development of **a more general-purpose perception model** based on Vision-Language Models (VLMs), which would integrate general detection, image captioning, and OCR tasks into a unified framework. **Parsing the content of the pictures in the documents** is also a key priority for our future work.
We believe that collaboration is the key to tackling these exciting challenges. If you are passionate about advancing the frontiers of document intelligence and are interested in contributing to these future endeavors, we would love to hear from you. Please reach out to us via email at: [yanqing4@xiaohongshu.com].

## Author List

### Contributors
Mi Jian, Yumeng Li, Bowen Wang, Xiaomin He, Zheyuan Gu

### Project Leader
Qing Yan

### Advisor
Colin Zhang, Lei Zhang
