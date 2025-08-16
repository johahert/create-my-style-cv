import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PersonalInfo } from "../types";

interface PersonalInfoFormProps {
  personalInfo: PersonalInfo;
  updatePersonalInfo: (updates: Partial<PersonalInfo>) => void;
}

export const PersonalInfoForm = ({ personalInfo, updatePersonalInfo }: PersonalInfoFormProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="fullName">Full Name</Label>
        <Input
          id="fullName"
          value={personalInfo.fullName}
          onChange={(e) => updatePersonalInfo({ fullName: e.target.value })}
          placeholder="John Doe"
        />
      </div>
      
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={personalInfo.email}
          onChange={(e) => updatePersonalInfo({ email: e.target.value })}
          placeholder="john@example.com"
        />
      </div>
      
      <div>
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          value={personalInfo.phone}
          onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
          placeholder="+1 (555) 123-4567"
        />
      </div>
      
      <div>
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          value={personalInfo.address}
          onChange={(e) => updatePersonalInfo({ address: e.target.value })}
          placeholder="City, State, Country"
        />
      </div>
      
      <div>
        <Label htmlFor="summary">Professional Summary</Label>
        <Textarea
          id="summary"
          value={personalInfo.summary}
          onChange={(e) => updatePersonalInfo({ summary: e.target.value })}
          placeholder="A brief summary of your professional background and goals..."
          className="min-h-20"
        />
      </div>
    </div>
  );
};