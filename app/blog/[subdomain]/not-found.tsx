import "./styles.css"
export default function NotFound() {
    return <div className="centerarea404">
        <img src="/textmark-with-logo.svg" className="textmark-logo-404" />
        <h1 className="error-text-404">Resource Not Found (404)</h1>
        <img src="/telescope.svg" className="telescope-404" />
        <p className="error-description-404">The resource you are looking for does not exist.</p>
    </div>
}