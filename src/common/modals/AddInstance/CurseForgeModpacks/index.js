/* eslint-disable */
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Select, Input } from 'antd';
import { useDebouncedCallback } from 'use-debounce';
import AutoSizer from 'react-virtualized-auto-sizer';
import { getSearch } from '../../../api';
import ModpacksListWrapper from './ModpacksListWrapper';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBomb, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

let lastRequest;
const CurseForgeModpacks = ({ setStep, setVersion, setModpack }) => {
  const mcVersions = useSelector(state => state.app.vanillaManifest?.versions);
  const categories = useSelector(state => state.app.curseforgeCategories);
  const infiniteLoaderRef = useRef(null);
  const [modpacks, setModpacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [minecraftVersion, setMinecraftVersion] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [sortBy, setSortBy] = useState('Featured');
  const [searchText, setSearchText] = useState('');
  const [hasNextPage, setHasNextPage] = useState(false);
  const [error, setError] = useState(false);

  const updateModpacks = useDebouncedCallback(() => {
    if (infiniteLoaderRef?.current?.scrollToItem) {
      infiniteLoaderRef.current.scrollToItem(0);
    }
    loadMoreModpacks(true);
  }, 250);

  const loadMoreModpacks = async (reset = false) => {
    const reqObj = {};
    lastRequest = reqObj;
    if (!loading) {
      setLoading(true);
    }
    if (reset && (modpacks.length !== 0 || hasNextPage)) {
      setModpacks([]);
      setHasNextPage(false);
    }
    let data = null;
    try {
      if (error) {
        setError(false);
      }
      ({ data } = await getSearch(
        'modpacks',
        searchText,
        40,
        reset ? 0 : modpacks.length,
        sortBy,
        true,
        minecraftVersion,
        categoryId
      ));
    } catch (err) {
      setError(err);
      return;
    }
    const newModpacks = reset ? data : [...modpacks, ...data];
    if (lastRequest === reqObj) {
      setLoading(false);
      setHasNextPage(newModpacks.length % 40 === 0 && newModpacks.length !== 0);
      setModpacks(newModpacks);
    }
  };

  useEffect(() => {
    updateModpacks.callback();
  }, [searchText, sortBy, minecraftVersion, categoryId]);

  return (
    <Container>
      <HeaderContainer>
        <StyledSelect
          placeholder="Minecraft Version"
          onChange={setMinecraftVersion}
          defaultValue={null}
        >
          <Select.Option value={null}>全バージョン</Select.Option>
          {(mcVersions || [])
            .filter(v => v?.type === 'release')
            .map(v => (
              <Select.Option key={v?.id} value={v?.id}>
                {v?.id}
              </Select.Option>
            ))}
        </StyledSelect>
        <StyledSelect
          placeholder="Minecraft Category"
          onChange={setCategoryId}
          defaultValue={null}
        >
          <Select.Option key={'allcategories'} value={null}>
            全カテゴリ
          </Select.Option>
          {(categories || [])
            .filter(v => v?.rootGameCategoryId === 4471)
            .sort((a, b) => a?.name.localeCompare(b?.name))
            .map(v => (
              <Select.Option value={v?.id} key={v?.id}>
                <div
                  css={`
                    display: flex;
                    align-items: center;
                    width: 100%;
                    height: 100%;
                  `}
                >
                  <img
                    src={v?.avatarUrl}
                    css={`
                      height: 16px;
                      width: 16px;
                      margin-right: 10px;
                    `}
                  />
                  {v?.name}
                </div>
              </Select.Option>
            ))}
        </StyledSelect>
        <StyledSelect
          placeholder="Sort by"
          defaultValue="Featured"
          onChange={setSortBy}
        >
          <Select.Option key="Featured" value="Featured">
            注目
          </Select.Option>
          <Select.Option key="Popularity" value="Popularity">
            人気
          </Select.Option>
          <Select.Option key="LastUpdated" value="LastUpdated">
            最新
          </Select.Option>
          <Select.Option key="Name" value="Name">
            ModPack名
          </Select.Option>
          <Select.Option key="Author" value="Author">
            作成者名
          </Select.Option>
          <Select.Option key="TotalDownloads" value="TotalDownloads">
            最多ダウンロード
          </Select.Option>
        </StyledSelect>
        <StyledInput
          placeholder="検索..."
          onSearch={setSearchText}
          onChange={e => setSearchText(e.target.value)}
          style={{ width: 200 }}
        />
      </HeaderContainer>
      <ModpacksContainer>
        {!error ? (
          !loading && modpacks.length == 0 ? (
            <div
              css={`
                margin-top: 120px;
                display: flex;
                flex-direction: column;
                align-items: center;
                font-size: 150px;
              `}
            >
              <FontAwesomeIcon icon={faExclamationCircle} />
              <div
                css={`
                  font-size: 20px;
                  margin-top: 70px;
                `}
              >
                ModPackが見つかりませんでした
              </div>
            </div>
          ) : (
            <AutoSizer>
              {({ height, width }) => (
                <ModpacksListWrapper
                  hasNextPage={hasNextPage}
                  isNextPageLoading={loading}
                  items={modpacks}
                  loadNextPage={loadMoreModpacks}
                  width={width}
                  height={height}
                  setStep={setStep}
                  setVersion={setVersion}
                  setModpack={setModpack}
                  infiniteLoaderRef={infiniteLoaderRef}
                />
              )}
            </AutoSizer>
          )
        ) : (
          <div
            css={`
              margin-top: 120px;
              display: flex;
              flex-direction: column;
              align-items: center;
              font-size: 150px;
            `}
          >
            <FontAwesomeIcon icon={faBomb} />
            <div
              css={`
                font-size: 20px;
                margin-top: 70px;
              `}
            >
              ModPackリストのロード中にエラーが発生しました...
            </div>
          </div>
        )}
      </ModpacksContainer>
    </Container>
  );
};

export default React.memo(CurseForgeModpacks);

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const StyledSelect = styled(Select)`
  width: 170px;
  margin-right: 20px;
`;

const StyledInput = styled(Input.Search)``;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const ModpacksContainer = styled.div`
  height: calc(100% - 15px);
  overflow: hidden;
  padding: 10px 0;
`;