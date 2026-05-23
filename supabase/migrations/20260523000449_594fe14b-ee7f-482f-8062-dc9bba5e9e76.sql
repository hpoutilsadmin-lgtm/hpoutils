-- Orders: deny all direct client access (service role bypasses RLS)
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Deny all client access to orders" ON public.orders;
CREATE POLICY "Deny all client access to orders"
  ON public.orders
  AS RESTRICTIVE
  FOR ALL
  TO anon, authenticated
  USING (false)
  WITH CHECK (false);

-- pdfs bucket: deny all direct client access on storage.objects
DROP POLICY IF EXISTS "Deny all client access to pdfs bucket" ON storage.objects;
CREATE POLICY "Deny all client access to pdfs bucket"
  ON storage.objects
  AS RESTRICTIVE
  FOR ALL
  TO anon, authenticated
  USING (bucket_id <> 'pdfs')
  WITH CHECK (bucket_id <> 'pdfs');