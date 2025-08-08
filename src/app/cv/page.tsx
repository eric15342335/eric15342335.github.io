export default function CVPage() {
  return (
    <>
      <header>
        <h1>Curriculum Vitae</h1>
      </header>

      <main>
        <object 
          data="/ChengHoMingCV.pdf" 
          type="application/pdf"
          style={{ height: '100%', width: '84%', minHeight: '100vh' }} 
          id="pdf-viewer"
        >
          <p>
            It appears you don&apos;t have a PDF plugin for this browser.
          </p>
        </object>
        <p>
          You can <a href="/ChengHoMingCV.pdf">click here to download the PDF file.</a>
        </p>
      </main>
    </>
  );
}