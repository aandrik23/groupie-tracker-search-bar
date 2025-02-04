package groupie_tracker_search

import (
	"html/template"
	"log"
	"net/http"
	"path/filepath"
)

func MainPage(w http.ResponseWriter, r *http.Request) {
	// Fetch cached data
	artists, err := getCachedArtists()
	if err != nil {
		http.Error(w, "Error fetching artists", http.StatusInternalServerError)
		log.Println("Error fetching artists:", err)
		return
	}

	if r.URL.Path != "/" {

		NotFoundHandler(w, r) // Serve the custom 404 HTML page
		return
	}

	// Path to the template file
	templatePath := filepath.Join("html", "Main_Page.html")

	// Parse the template
	tmpl, err := template.ParseFiles(templatePath)
	if err != nil {
		http.Error(w, "Could not load template", http.StatusInternalServerError)
		log.Println("Error loading template:", err)
		return
	}

	// Execute the template with data
	if err := tmpl.Execute(w, artists); err != nil {
		http.Error(w, "Failed to render template", http.StatusInternalServerError)
		log.Println("Error rendering template:", err)
		return
	}
}
