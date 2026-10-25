# Counter App (AP5PM)

[![CI](https://github.com/Vitality-In3D/Mobile---app/actions/workflows/ci.yml/badge.svg)](https://github.com/Vitality-In3D/Mobile---app/actions/workflows/ci.yml)

Hybridní mobilní aplikace vytvořená v rámci předmětu AP5PM (Mobilní aplikace, FAI UTB ve Zlíně) s využitím frameworků **Ionic 9**, **Angular 22** a **Capacitor 8.5**.

---

## Zadání cvičení

Samostatně zpracujte celé cvičení CV04 podle README. Povinné jsou také tyto úlohy, které jsou v CV04 označené jako bonusové:

- zobrazit součet hodnot všech uložených počítadel,
- umožnit řazení historie,
- umožnit vyhledávání podle názvu,
- před vymazáním celé historie zobrazit potvrzovací ion-alert,
- po úspěšném uložení nebo odstranění záznamu zobrazit ion-toast.

Zadání obsahuje také individuální funkci: **zobrazení průměru hodnot** uložených počítadel.

---

## Přehled funkcionality

- **Záložka 1 (Počítadlo)**:
  - Inkrementace, dekrementace a reset počítadla.
  - Možnost zadat název počítadla a uložit jej do historie.
  - Zobrazení `ion-toast` oznámení po úspěšném uložení.
- **Záložka 2 (Historie)**:
  - Persistentní ukládání dat pomocí `@capacitor/preferences`.
  - Statistická karta se souhrnem: celkový počet záznamů, **součet všech hodnot** a **průměr hodnot** (individuální funkce).
  - Vyhledávání záznamů podle názvu počítadla.
  - Řazení historie podle data i hodnoty.
  - Odstranění jednotlivého záznamu s `ion-toast` potvrzením.
  - Vymazání celé historie s bezpečnostním potvrzovacím dialogem `ion-alert`.
- **Záložka 3 (O aplikaci)**:
  - Informace o projektu, autorovi a technologiích.

---

## Technologický stack

- **Angular 22** (Standalone Components, Signals, Computed Signals)
- **Ionic 9** (Mobilní UI komponenty)
- **Capacitor 8.5** (Preferences API pro lokální perzistenci dat)
- **Vitest** (Jednotkové testy)
- **ESLint & Prettier** (Kvalita a jednotný formát kódu)
- **GitHub Actions** (Automatizované CI testování a sestavení)

---

## Příkazy pro instalaci a spuštění

### 1. Instalace závislostí

```bash
npm install
```

### 2. Spuštění lokálního vývojového serveru

```bash
npm start
# nebo pomocí Ionic CLI:
ionic serve
```

Aplikace se spustí ve webovém prohlížeči (`http://localhost:4200/` při `npm start` nebo `http://localhost:8100/` při `ionic serve`).

### 3. Kontrola linteru

```bash
npm run lint
```

### 4. Spuštění jednotkových testů

```bash
npm test -- --watch=false
```

### 5. Sestavení aplikace (Build)

```bash
ionic build
```

Výsledný sestavený balíček se vygeneruje do složky `www/`.
