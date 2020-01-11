import 'datatables.net-fixedcolumns-bs4'
import axios from 'axios'
import dayjs from 'dayjs'

import User from './../class/User'
import { generateCustomSearch } from './../components/datatable-searchbox'
import { generateButtonSpinner } from './../components/button-spinner'
import { generateUserProfileDetail, hideSecondaryModal } from '../components/modals/index'
import { uploadProfilePhoto, saveProfilePhoto, processPhotoUploading } from './../components/photo-uploader'
import { addError, removeError } from './../components/input-field'
import { generateAdminRole, generateUserRole } from './../components/role'

$(function() {
  generateCustomSearch('#articles-table_filter')
  axios.get('/api/articles').then(res => console.log('ARTICLES: ', res))
})

// Generate Datatables
let articlesTable = $('#articles-table').DataTable({
  serverSide: false,
  processing: true,
  ajax: '/api/articles',
  scrollX: true,
  drawCallback: function(settings) {
    console.log('Data refreshed...')
  },
  order: [],

  columns: [
    {
      orderable: false,
      sortable: false,
      render: function() {
        return ''
      },
    },
    {
      data: 'title',
      name: 'title',
      className: 'table-article-title',
      orderData: [0, 1],
      render: function(data, type, full, meta) {
        let cover = `/media/user-${full.author.id}/${full.cover.src}` || 'default.png'
        let fullData = JSON.stringify(full)
        if (type === 'sort') {
          return data
        } else {
          return `
            <a href="/articles/${full.id}" class="article-info table-main-info">
              <div class="profile-thumbnail lazyload-bg" style="width: 72px; height: 48px; min-width: 72px; min-height: 48px; background-image: url('${cover}'), linear-gradient(to top, #008384, #008384);"></div>
              <textarea class="hidden">${fullData}</textarea>
              <span class="user-data">
                <div class="heading4 user-main-info">
                  <span>
                    ${full.title}
                  </span>
                  ${full.reviewed ? '' : '<span class="user-role">New!</span>'}
                </div>
              </span>
            </a>
          `
        }
      },
    },
    {
      data: 'published',
      name: 'published',
      className: 'table-article-status',
      render: function(data, type, full, meta) {
        if (type === 'sort') {
          return data
        } else {
          return data ? `<span class="status--listed"></span>` : `<span class="status--submitted"></span>`
        }
      },
    },
    {
      data: 'author',
      name: 'author',
      className: 'table-article-author',
      render: function(data, type, full, meta) {
        let admin = data.role === 'admin'
        let profilePicture = data.photo || 'default.png'

        if (type === 'sort') {
          return data.name
        } else {
          if (type === 'sort') {
            return data
          } else {
            return `
            <div class="user-info">
              <div class="profile-thumbnail lazyload-bg" style="width: 32px; height: 32px; min-width: 32px; min-height: 32px; background-image: url('/images/users/${profilePicture}'), linear-gradient(to top, #008384, #008384);"></div>
              <span class="user-data">
                <div class="medium user-main-info">
                  ${data.name} <span class="user-info-id">
                  ${admin ? '<span class="user-role">admin</span>' : ''}
                </div>
              </span>
            </div>
          `
          }
        }
      },
    },
    {
      data: 'submitted_at',
      name: 'submitted_at',
      className: 'table-article-submitted-date',
      render: function(data, type, full, meta) {
        if (type === 'sort') {
          return data
        } else {
          return dayjs(data).format('MMM DD, YYYY')
        }
      },
    },
  ],
  language: {
    processing: '<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i><span class="sr-only">Loading...</span>',
  },
  pageLength: 25,
  dom: '<"table-footer-info"  i <".separator"> l>frt<"#tableFooter.datatable-footer" p>',
})

articlesTable
  .on('order.dt search.dt', function() {
    articlesTable
      .column(0, { search: 'applied', order: 'applied' })
      .nodes()
      .each(function(cell, i) {
        cell.innerHTML = i + 1
      })
  })
  .draw()
