import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Input, Textarea } from "../../../components/brand/Field";
import { Button } from "../../../components/brand/Button";
import { adminGetProfile, adminUpdateProfile } from "../../../lib/api/admin.functions";
import type { Profile } from "../../../lib/types";

export const Route = createFileRoute("/admin/_authed/profile")({
  loader: () => adminGetProfile(),
  component: ProfileEditor,
});

function ProfileEditor() {
  const profile = Route.useLoaderData();
  const [bio, setBio] = useState(profile.bio);
  const [skillsText, setSkillsText] = useState(profile.skills.join(", "));
  const [experience, setExperience] = useState<Profile["experience"]>(profile.experience);
  const [resumeUrl, setResumeUrl] = useState(profile.resumeUrl ?? "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  function updateExperience(i: number, field: keyof Profile["experience"][number], value: string) {
    setExperience((rows) => rows.map((row, idx) => (idx === i ? { ...row, [field]: value } : row)));
  }

  function addExperienceRow() {
    setExperience((rows) => [...rows, { role: "", place: "", years: "" }]);
  }

  function removeExperienceRow(i: number) {
    setExperience((rows) => rows.filter((_, idx) => idx !== i));
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
        resumeUrl: resumeUrl || null,
      },
    });
    setSaving(false);
    setSaved(true);
  }

  return (
    <div>
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
              <div key={i} className="grid grid-cols-1 gap-2 rounded-md border border-line p-3 sm:grid-cols-[2fr_2fr_1fr_auto]">
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
                <Input
                  placeholder="2023-Now"
                  value={row.years}
                  onChange={(e) => updateExperience(i, "years", e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => removeExperienceRow(i)}
                  className="self-center rounded-md px-2 py-1 text-caption font-semibold text-critical"
                >
                  Remove
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

        {saved && <p className="text-caption text-success-fg">Saved.</p>}
        <Button type="submit" disabled={saving} className="self-start">
          {saving ? "Saving…" : "Save changes"}
        </Button>
      </form>
    </div>
  );
}
