"use client";
import { Admin, Resource } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";
import { ServiceList, ServiceCreate, ServiceEdit } from "./resources/Services";
import { ClientLogoList, ClientLogoCreate } from "./resources/ClientLogo";
import { TestimoniaList, TestimonialCreate, TestimonialEdit } from "./resources/Testimonials";
import { InsightsList, InsightsCreate, InsightsEdit } from "./resources/Insights";
import { SuccessStoriesList, SuccessStoriesCreate, SuccessStoriesEdit } from "./resources/SuccessStories";
import { ContactList } from "./resources/Contact";

export default function AdminPageClient() {
  return (
      <Admin dataProvider={simpleRestProvider("/api")}>
        <Resource name="services" list={ServiceList} edit={ServiceEdit} create={ServiceCreate} />
        <Resource name="client_logo" list={ClientLogoList} create={ClientLogoCreate} />
        <Resource name="testimonials" list={TestimoniaList} edit={TestimonialEdit} create={TestimonialCreate} />
        <Resource name="insights" list={InsightsList} edit={InsightsEdit} create={InsightsCreate} />
        <Resource name="success_stories" list={SuccessStoriesList} edit={SuccessStoriesEdit} create={SuccessStoriesCreate} />
        <Resource name="inquiries" list={ContactList} />
      </Admin>
  );
}
