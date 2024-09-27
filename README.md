<h1>HTML to Thumbnail Generator and Zip Downloader</h1>
<p>This project allows users to upload an <code>.html</code> file, generate a thumbnail image from it, and download both the image and the renamed <code>index.html</code> file as a compressed zip folder. It utilizes <strong>html2canvas</strong> to capture a screenshot of the rendered HTML content and <strong>JSZip</strong> to package the files for download.</p>

<h2>Features:</h2>
<ul>
  <li>Upload an <code>.html</code> file.</li>
  <li>Automatically generate a thumbnail image of the HTML content using <strong>html2canvas</strong>.</li>
  <li>Rename the uploaded HTML file to <code>index.html</code>.</li>
  <li>Download both the thumbnail and the <code>index.html</code> file in a zip folder.</li>
</ul>

<h2>Technologies Used:</h2>
<ul>
  <li><strong>HTML</strong> for structuring the page.</li>
  <li><strong>CSS</strong> for styling.</li>
  <li><strong>JavaScript</strong> for the core functionality.</li>
  <li><strong>html2canvas</strong> for capturing the HTML content as an image.</li>
  <li><strong>JSZip</strong> for creating and downloading a zip file.</li>
</ul>

<h2>How It Works:</h2>
<ol>
  <li>The user uploads an <code>.html</code> file.</li>
  <li>The system renders the HTML in an invisible iframe and captures a screenshot of the content using <strong>html2canvas</strong>.</li>
  <li>The thumbnail image and the original <code>.html</code> file (renamed to <code>index.html</code>) are bundled into a zip file using <strong>JSZip</strong>.</li>
  <li>The zip file is then automatically downloaded to the user's device.</li>
</ol>
