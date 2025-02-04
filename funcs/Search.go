package groupie_tracker_search

import (
	"encoding/json"
	"net/http"
	"strings"
)

func SearchHandler(w http.ResponseWriter, r *http.Request) {
	query := strings.ToLower(r.URL.Query().Get("q"))

	if query == "" {
		http.Error(w, "Query cannot be empty", http.StatusBadRequest)
		return
	}

	var results []map[string]interface{} // Change to include interface{} to hold both strings and integers

	for _, artist := range cachedArtists {
		// Search for artist name
		if strings.Contains(strings.ToLower(artist.Name), query) {
			results = append(results, map[string]interface{}{
				"id":   artist.ID, // Add the ID
				"name": artist.Name,
				"type": "artist/band",
			})
		}

		// Search for members
		for _, member := range artist.Members {
			if strings.Contains(strings.ToLower(member), query) {
				results = append(results, map[string]interface{}{
					"id":   artist.ID, // Link to artist ID
					"name": member,
					"type": "member",
				})
			}
		}

		// Search for locations
		for _, location := range artist.Locations.Locations {
			if strings.Contains(strings.ToLower(location), query) {
				results = append(results, map[string]interface{}{
					"id":   artist.ID, // Link to artist ID
					"name": location,
					"type": "location",
				})
			}
		}

		// Search for dates
		for _, date := range artist.Dates.Dates {
			if strings.Contains(strings.ToLower(date), query) {
				results = append(results, map[string]interface{}{
					"id":   artist.ID, // Link to artist ID
					"name": date,
					"type": "date",
				})
			}
		}

		// Search for first album date
		if strings.Contains(strings.ToLower(artist.FirstAlbum), query) {
			results = append(results, map[string]interface{}{
				"id":   artist.ID, // Link to artist ID
				"name": artist.FirstAlbum,
				"type": "first album date",
			})
		}

		// Search for creation date
		if strings.Contains(strings.ToLower(string(artist.CreationDate)), query) {
			results = append(results, map[string]interface{}{
				"id":   artist.ID, // Link to artist ID
				"name": string(artist.CreationDate),
				"type": "creation date",
			})
		}
	}

	// If no results found
	if len(results) == 0 {
		http.Error(w, "No results found", http.StatusNotFound)
		return
	}

	// Return results as JSON
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(results)
}
