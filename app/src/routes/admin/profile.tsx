import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "../../components/admin/AdminShell";
import { Input, Textarea } from "../../components/brand/Field";
import { Button } from "../../components/brand/Button";
import { ImageField } from "../../components/admin/ImageField";
import { requireAdminBeforeLoad } from "../../lib/admin-guard";
import { adminGetProfile, adminUpdateProfile } from "../../lib/api/admin.functions";
import type { Profile } from "../../lib/types";

const emptyExperienceRow = { role: "", place: "", years: "", description: "", workType: "", duration: "", logoUrl: "" };
const emptyPersonRow = { name: "", role: "", photoUrl: "" };

export const Route = createFileRoute("/admin/profile")({
  beforeLoad: ({ location }) => requireAdminBeforeLoad(location.pathname),
  loader: () => adminGetProfile(),
  component: ProfileEditor,
});

function ProfileEditor() {
  const profile = Route.useLoaderData();
  const [bio, setBio] = useState(profile.bio);
  const [skillsText, setSkillsText] = useState(profile.skills.join(", "));
  const [experience, setExperience] = useState<Profile["experience"]>(profile.experience);
  const [people, setPeople] = useState<Profile["people"]>(profile.people);
  const [resumeUrl, setResumeUrl] = useState(profile.resumeUrl ?? "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  function updateExperience(i: number, field: keyof Profile["experience"][number], value: string) {
    setExperience((rows) => rows.map((row, idx) => (idx === i ? { ...row, [field]: value } : row)));
  }

  function addExperienceRow() {
    setExperience((rows) => [...rows, { ...emptyExperienceRow }]);
  }

  function removeExperienceRow(i: number) {
    setExperience((rows) => rows.filter((_, idx) => idx !== i));
  }

  function updatePerson(i: number, field: keyof Profile["people"][number], value: string) {
    setPeople((rows) => rows.map((row, idx) => (idx === i ? { ...row, [field]: value } : row)));
  }

  function addPersonRow() {
    setPeople((rows) => [...rows, { ...emptyPersonRow }]);
  }

  function removePersonRow(i: number) {
    setPeople((rows) => rows.filter((_, idx) => idx !== i));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    await adminUpdateProfile({
      data: {
        bio,
        skills: skillsText
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        experience: experience.filter((row) => row.role || row.place || row.years),
        people: people.filter((row) => row.name),
        resumeUrl: resumeUrl || null,
      },
    });
    setSaving(false);
    setSaved(true);
  }

  return (
    <AdminShell>
      <h1 className="mb-6 font-display text-heading-lg font-semibold text-ink-900">About page content</h1>
      <form onSubmit={handleSubmit} className="flex max-w-[640px] flex-col gap-5">
        <Textarea label="Bio" rows={6} value={bio} onChange={(e) => setBio(e.target.value)} />
        <Input label="Skills (comma separated)" value={skillsText} onChange={(e) => setSkillsText(e.target.value)} />
        <Input
          label="Résumé URL (optional: paste a link to a hosted PDF)"
          value={resumeUrl}
          onChange={(e) => setResumeUrl(e.target.value)}
        />

        <div>
          <div className="mb-2 text-body-sm font-semibold text-ink-900">Experience</div>
          <div className="flex flex-col gap-3">
            {experience.map((row, i) => (
              <div key={i} className="flex flex-col gap-2 rounded-md border border-line p-3">
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <Input
                    placeholder="Role"
                    value={row.role}
                    onChange={(e) => updateExperience(i, "role", e.target.value)}
                  />
                  <Input
                    placeholder="Company"
                    value={row.place}
                    onChange={(e) => updateExperience(i, "place", e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                  <Input
                    placeholder="Dates, e.g. Jul 2024-Present"
                    value={row.years}
                    onChange={(e) => updateExperience(i, "years", e.target.value)}
                  />
                  <Input
                    placeholder="Work type, e.g. Remote"
                    value={row.workType}
                    onChange={(e) => updateExperience(i, "workType", e.target.value)}
                  />
                  <Input
                    placeholder="Duration badge, e.g. 3 yrs"
                    value={row.duration}
                    onChange={(e) => updateExperience(i, "duration", e.target.value)}
                  />
                </div>
                <Textarea
                  placeholder="What you did in this role"
                  rows={2}
                  value={row.description}
                  onChange={(e) => updateExperience(i, "description", e.target.value)}
                />
                <ImageField
                  label="Company logo (optional)"
                  value={row.logoUrl}
                  onChange={(url) => updateExperience(i, "logoUrl", url)}
                />
                <button
                  type="button"
                  onClick={() => removeExperienceRow(i)}
                  className="self-start text-caption font-semibold text-critical"
                >
                  Remove this role
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addExperienceRow}
            className="mt-2 rounded-md border border-line px-3 py-1.5 text-caption font-semibold text-ink-900"
          >
            + Add role
          </button>
        </div>

        <div>
          <div className="mb-2 text-body-sm font-semibold text-ink-900">
            People we've worked with (shown on the homepage)
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {people.map((row, i) => (
              <div key={i} className="flex flex-col gap-2 rounded-md border border-line p-3">
                <Input
                  placeholder="Name"
                  value={row.name}
                  onChange={(e) => updatePerson(i, "name", e.target.value)}
                />
                <Input
                  placeholder="Role, e.g. Actor, Businessman"
                  value={row.role}
                  onChange={(e) => updatePerson(i, "role", e.target.value)}
                />
                <ImageField
                  label="Photo (optional, falls back to initials)"
                  value={row.photoUrl}
                  onChange={(url) => updatePerson(i, "photoUrl", url)}
                />
                <button
                  type="button"
                  onClick={() => removePersonRow(i)}
                  className="self-start text-caption font-semibold text-critical"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addPersonRow}
            className="mt-2 rounded-md border border-line px-3 py-1.5 text-caption font-semibold text-ink-900"
          >
            + Add person
          </button>
        </div>

        {saved && <p className="text-caption text-success-fg">Saved.</p>}
        <Button type="submit" disabled={saving} className="self-start">
          {saving ? "Saving…" : "Save changes"}
        </Button>
      </form>
    </AdminShell>
  );
}
