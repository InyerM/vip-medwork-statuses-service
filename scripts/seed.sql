INSERT INTO public.statuses (id, name, parent_id, "order", created_at) VALUES ('2fcad07d-fc6f-4634-92ac-8e57b6391554', 'Scheduled', null, 2, default);
INSERT INTO public.statuses (id, name, parent_id, "order", created_at) VALUES ('5c2f3e5c-9cda-45f0-a36f-9fd0ea09c133', 'In Consultation', '4946bc5c-d042-440c-ab92-57bacfc13a69', 1, default);
INSERT INTO public.statuses (id, name, parent_id, "order", created_at) VALUES ('fcc83bb9-763b-45a8-9f01-340f79a25323', 'Cancelled', '4946bc5c-d042-440c-ab92-57bacfc13a69', 2, default);
INSERT INTO public.statuses (id, name, parent_id, "order", created_at) VALUES ('4946bc5c-d042-440c-ab92-57bacfc13a69', 'Checked-In', '2fcad07d-fc6f-4634-92ac-8e57b6391554', 1, default);
INSERT INTO public.statuses (id, name, parent_id, "order", created_at) VALUES ('4dd81881-b1b0-473a-833b-19b42ee078a9', 'No-Show', '2fcad07d-fc6f-4634-92ac-8e57b6391554', 2, default);
