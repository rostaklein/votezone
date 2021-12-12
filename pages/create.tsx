import React, { useMemo } from "react"
import Layout from "../components/Layout"
import gql from "graphql-tag"
import {
  useChroniclesQuery,
  useCreateServerMutation,
} from "../generated/gql-client"
import { StyledFormInput } from "../components/sharedStyles"
import { useFormik } from "formik"
import * as Yup from "yup"
import {
  Button,
  Callout,
  FormGroup,
  HTMLSelect,
  Tag,
  TextArea,
  Toaster,
} from "@blueprintjs/core"
import { Col, Row } from "react-grid-system"
import { DateInput, DatePicker } from "@blueprintjs/datetime"

gql`
  query Chronicles {
    chronicles {
      id
      name
      shortcut
    }
  }
`

gql`
  mutation CreateServer($input: CreateServerInput!) {
    createServer(input: $input) {
      id
      name
      description
      chronicle {
        name
      }
    }
  }
`

const CreateServerSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  description: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  openingAt: Yup.date(),
  chronicle: Yup.string().required("Required"),
  xp: Yup.number().required("Required"),
  sp: Yup.number().required("Required"),
  adena: Yup.number().required("Required"),
  drop: Yup.number().required("Required"),
  spoil: Yup.number().required("Required"),
})

type FormValues = Partial<Yup.TypeOf<typeof CreateServerSchema>>

function CreateServer() {
  const { data: chronicles } = useChroniclesQuery()

  const [createServer] = useCreateServerMutation()
  const {
    errors,
    handleSubmit,
    values,
    handleChange,
    dirty,
    resetForm,
    isValid,
    setFieldValue,
  } = useFormik<FormValues>({
    initialValues: {},
    validationSchema: CreateServerSchema,
    validateOnChange: false,
    onSubmit: async values => {
      const parsedValues = CreateServerSchema.cast(
        values
      ) as Required<FormValues>
      await createServer({
        variables: {
          input: parsedValues,
        },
      })

      const toaster = Toaster.create()

      toaster.show({
        message: "Server created.",
        intent: "success",
        icon: "tick",
      })

      resetForm()
    },
  })

  const maxDate = useMemo(() => {
    const maxDate = new Date()
    maxDate.setMonth(new Date().getMonth() + 12)

    return maxDate
  }, [])

  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <h1>Add Server</h1>
        <Row gutterWidth={8}>
          <Col sm={9}>
            <FormGroup
              label="Server Name"
              labelFor="name"
              labelInfo="(required)"
            >
              <StyledFormInput
                autoFocus
                name="name"
                onChange={handleChange}
                placeholder="Server Name"
                type="text"
                value={values.name}
              />
            </FormGroup>
          </Col>
          <Col sm={3}>
            <FormGroup
              label="Grand Opening"
              labelFor="openingAt"
              labelInfo="(GMT+0)"
            >
              <DateInput
                onChange={selectedDate =>
                  setFieldValue("openingAt", selectedDate)
                }
                fill
                parseDate={date => (console.log(date), new Date(date))}
                formatDate={date => `${date.toUTCString()}`}
                timePrecision="minute"
                timePickerProps={{ showArrowButtons: true }}
                maxDate={maxDate}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row gutterWidth={8}>
          <Col md={4}>
            <FormGroup label="Chronicle" labelFor="xp" labelInfo="(required)">
              <HTMLSelect fill onChange={handleChange} name="chronicle">
                {chronicles?.chronicles?.map(chronicle => (
                  <option
                    key={chronicle?.id}
                    value={chronicle?.id ?? undefined}
                  >
                    {chronicle?.name} ({chronicle?.shortcut})
                  </option>
                ))}
              </HTMLSelect>
            </FormGroup>
          </Col>
          <Col md={8}>
            <Row gutterWidth={8} align="end">
              {["XP", "SP", "Adena", "Drop", "Spoil"].map(rate => (
                <Col key={rate}>
                  <FormGroup
                    label={rate}
                    labelFor={rate.toLowerCase()}
                    labelInfo="(required)"
                  >
                    <StyledFormInput
                      name={rate.toLowerCase()}
                      onChange={handleChange}
                      placeholder="1"
                      type="text"
                      value={values[rate.toLowerCase()]}
                      rightElement={<Tag minimal>x</Tag>}
                    />
                  </FormGroup>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>

        <FormGroup label="Server Info" labelFor="description">
          <TextArea
            growVertically={true}
            fill
            name="description"
            placeholder="Description"
            onChange={handleChange}
            value={values.description}
            minLength={100}
          />
        </FormGroup>
        {!isValid && (
          <Callout
            title="Form invalid"
            intent="danger"
            style={{ marginBottom: 12 }}
          >
            {Object.entries(errors).map(([key, value]) => (
              <span key={key} style={{ marginRight: 8 }}>
                <b>{key}:</b> {value}
              </span>
            ))}
          </Callout>
        )}
        <Button intent="primary" disabled={!dirty} type="submit">
          Submit
        </Button>
      </form>
    </Layout>
  )
}

export default CreateServer
