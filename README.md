# 🍽️ Rezeptwelt

Eine Rezept-Plattform für kulinarische Inspiration und Kreation – mit Benutzerauthentifizierung, Favoriten-System und Community-Features.

<img width="1240" height="646" alt="rezeptwelt_start" src="https://github.com/user-attachments/assets/9efb47d0-7a6c-4187-b018-e6be9eadd38d" />

<img width="1240" height="556" alt="rezeptwelt_sammlung" src="https://github.com/user-attachments/assets/03a94432-3d62-48c4-8e6e-47cc3b7bd982" />


---

## 📋 Über das Projekt

Rezeptwelt ist eine sich noch entwickelnde und wachsende Plattform, die Kochbegeisterte zusammenbringt und inspiriert. Die Webanwendung ermöglicht es Nutzern, Rezepte aus verschiedensten Küchen und Kategorien zu entdecken, eigene kulinarische Kreationen zu teilen und persönliche Favoriten-Listen anzulegen.

Das Projekt entstand im Rahmen meiner Weiterbildung und befindet sich noch im Aufbau. Mit React, TypeScript und Supabase als Backend wurde eine skalierbare Full-Stack-Anwendung entwickelt, die CRUD-Funktionalität für Rezepte, Benutzerauthentifizierung und ein personalisiertes Profil-System bietet.

---

## 🛠️ Technologien

- **React 19** - UI-Framework mit komponentenbasierter Architektur
- **TypeScript** - Typsichere Entwicklung
- **React Router 7** - Client-seitiges Routing mit Protected Routes
- **Vite 7** - Modernes Build-Tool mit SWC und HMR
- **Tailwind CSS 4** - Utility-First CSS Framework mit Custom Design-System
- **Supabase** - Backend as a Service (Auth, PostgreSQL, Storage)
- **Axios** - HTTP-Client für API-Requests

---

## ✨ Features

### Für alle Nutzer
- ✅ **Rezept-Bibliothek** - Durchstöbern verschiedenster Kategorien und Küchen
- ✅ **Kategorie-Navigation** - Gefilterte Ansicht nach Rezeptkategorien

### Für registrierte Nutzer
- ✅ **Benutzer-Authentifizierung** - Email/Password-Login mit Supabase Auth
- ✅ **Eigene Rezepte erstellen** - CRUD-Funktionalität für persönliche Kreationen
- ✅ **Profil-Verwaltung** - Übersicht eigener Rezepte und Favoriten
- ✅ **Protected Routes** - Sichere Bereiche nur für eingeloggte Nutzer
- ✅ **Image Upload** - Hochladen von Rezeptbildern zu Supabase Storage
- ✅ **Session Management** - Automatische Session-Checks bei Tab-Wechsel

### Technische Features
- ✅ **Context API State Management** - Globaler State für Rezepte, User und Kategorien
- ✅ **TypeScript Interfaces** - Typsichere Datenmodelle für alle Entitäten
- ✅ **Relationale Datenbankabfragen** - Joins über Foreign Keys mit Supabase
- ✅ **File Preview** - Client-seitige Bildvorschau vor Upload
- ✅ **Dynamische Formulare** - Add/Remove-Funktion für Zutatenlisten

---

## 📚 Was ich gelernt habe

- **Supabase Backend-Integration**: Vollständige BaaS-Implementierung mit Auth, PostgreSQL und Storage
- **Context API für komplexen State**: Globale Verwaltung von Rezepten, Kategorien, Favoriten und User-Daten
- **Protected Routes Pattern**: Sichere Zugriffskontrolle mit Session-basierter Authentifizierung
- **Session Management**: Automatische Session-Checks mit `visibilitychange` Event und `onAuthStateChange`
- **File Upload System**: Image Upload zu Supabase Storage mit Preview-Funktion
- **Relationale Abfragen**: Joins und Embedded Resources mit Supabase Query Builder
- **TypeScript mit React**: Strikte Typisierung für Props, State und API-Responses
- **Dynamische Formulare**: Verwaltung von Listen (Zutaten) mit Add/Remove-Funktionalität
- **Tailwind Custom Theme**: Eigenes Design-System mit `@theme` und CSS-Variablen

---

<!--- ## 📸 Screenshots


### Kategorie-Übersicht
![Categories](screenshots/categories.png)

### Rezept-Liste
![Recipe List](screenshots/recipe-list.png)

### Rezept erstellen
![Create Recipe](screenshots/create-recipe.png)

### Favoriten-Seite
![Favorites](screenshots/favorites.png)

### Profil
![Profile](screenshots/profile.png) --->

---

## 🧩 Geplante Features & Verbesserungen

- [ ] **Fehlende UI-Elemente** - Vervollständigung des Designs
- [ ] **Responsive Design** - Optimierung für Mobile und Tablet
- [ ] **Key Visuals für Kategorien** - Individuelle Header-Bilder pro Kategorie
- [ ] **Erweiterte Suche** - Filter nach Zutaten, Zubereitungszeit, Schwierigkeit
- [ ] **Einkaufsliste** - Automatische Liste aus Rezepten generieren
- [ ] **Social Sharing** - Rezepte auf Social Media teilen
