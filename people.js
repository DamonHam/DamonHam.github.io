function createPersonLink(id) {
  const person = typeof peopleById !== "undefined" ? peopleById[id] : null;
  if (!person) return null;

  const a = document.createElement("a");
  a.href = getPersonHref(person.id);
  a.textContent = person.name || person.id;
  a.className = "person-link-inline";
  return a;
}

// Renders a list of person IDs into the given container element.
// If the list is empty or null, displays the provided emptyText instead.
function renderPersonIdList(container, ids, emptyText) {
  container.innerHTML = "";

  if (!ids || ids.length === 0) {
    const li = document.createElement("li");
    li.textContent = emptyText;
    container.appendChild(li);
    return;
  }

  ids.forEach(id => {
    const li = document.createElement("li");
    const link = createPersonLink(id);
    if (link) {
      li.appendChild(link);
    } else {
      li.textContent = id;
    }
    container.appendChild(li);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // Get main elements
  const nameEl = document.getElementById("person-name");
  const dobEl = document.getElementById("person-dob");
  const dodEl = document.getElementById("person-dod");
  const photoEl = document.getElementById("person-photo");

  // If any of the main elements are missing, abort
  if (!nameEl || !dobEl || !dodEl || !photoEl) return;

  const parentsList = document.getElementById("person-parents");
  const spousesList = document.getElementById("person-spouses");
  const childrenList = document.getElementById("person-children");
  const siblingsList = document.getElementById("person-siblings");
  const notesEl = document.getElementById("person-notes");
  const sourcesList = document.getElementById("person-sources");

  const params = new URLSearchParams(window.location.search);
  const personId = params.get("id");

  // Handle missing or invalid person ID
  if (!personId || typeof peopleById === "undefined" || !peopleById[personId]) {
    if (nameEl) nameEl.textContent = "Person not found";
    if (dobEl) dobEl.textContent = "";
    if (dodEl) dodEl.textContent = "";
    if (notesEl) {
      notesEl.textContent =
        "No person matches this link. Check the URL or return to the main tree.";
    }
    if (photoEl) photoEl.style.display = "none";
    if (parentsList) parentsList.innerHTML = "";
    if (spousesList) spousesList.innerHTML = "";
    if (childrenList) childrenList.innerHTML = "";
    if (siblingsList) siblingsList.innerHTML = "";
    if (sourcesList) sourcesList.innerHTML = "";
    return;
  }

  const person = peopleById[personId];
  const displayName = person.name || person.id;

  // Main header text
  nameEl.textContent = displayName;

  // Born / Died labels
  dobEl.innerHTML = person.dob
    ? `<strong>Born:</strong> ${person.dob}`
    : "";

  dodEl.innerHTML = person.dod
    ? `<strong>Died:</strong> ${person.dod}`
    : "";

  // Photo
  if (person.photo && person.photo.trim() !== "") {
    photoEl.src = `../imgs/${person.photo}`;
    photoEl.alt = displayName;
    photoEl.style.display = "block";
  } else {
    photoEl.style.display = "none";
  }

  // Parents
  renderPersonIdList(
    parentsList,
    person.parents,
    "No parents recorded."
  );

  // Spouses / partners
  // Normalize person.spouse into an array of ids
  let spouseIds = [];

  if (Array.isArray(person.spouse)) {
    spouseIds = person.spouse;
  } else if (typeof person.spouse === "string" && person.spouse.trim() !== "") {
    spouseIds = [person.spouse];
  }

  renderPersonIdList(
    spousesList,
    spouseIds,
    "No spouse or partners recorded."
  );

  // Children
  renderPersonIdList(
    childrenList,
    person.children,
    "No children recorded."
  );

  // Siblings
  renderPersonIdList(
    siblingsList,
    person.siblings,
    "No siblings recorded."
  );

  // Notes (uses person.bio for now)
  notesEl.textContent =
    person.bio && person.bio.trim() !== ""
      ? person.bio
      : "No notes have been added yet for this person.";

  // Sources (placeholder)
  sourcesList.innerHTML = "";
  const srcPlaceholder = document.createElement("li");
  srcPlaceholder.textContent = "Havent got this far yet";
  sourcesList.appendChild(srcPlaceholder);
});
